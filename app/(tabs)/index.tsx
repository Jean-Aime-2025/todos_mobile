import {
    UrbanistBold,
    UrbanistLight,
    UrbanistRegular,
} from "@/components/StyledText";
import {
    View,
    ScrollView,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import { router, useRouter, useFocusEffect } from "expo-router";
import { useState, useEffect, useCallback } from "react";
import TodoComponent from "@/components/common/TodoComponent";
import { deleteTodo, updateTodo } from "../../services/api";
import {useTodos} from "../../hooks/UseTodo"

const BgIconColors = [
    { bg: "#DBECF6", icon: "#194A66" },
    { bg: "#403100", icon: "#FEF5D3" },
    { bg: "#4A3780", icon: "#E7E2F3" },
];

export default function Home() {
    const screenHeight = Dimensions.get("window").height;
    const headerHeight = screenHeight * 0.25;

    const [todos, setTodos] = useState<Todo[]>([]);
    const [searchTitle, setSearchTitle] = useState("");
    const [currentDate, setCurrentDate] = useState("");
    const [currentTime, setCurrentTime] = useState("");
    const [activeTab, setActiveTab] = useState<"all" | "active" | "completed">(
        "all"
    );
    const [loading, setLoading] = useState(false);
    const {loadTodos}= useTodos()
    // Update date & time every minute
    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            setCurrentDate(
                now.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                })
            );
            setCurrentTime(
                now.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                })
            );
        };
        updateDateTime();
        const interval = setInterval(updateDateTime, 60000);
        return () => clearInterval(interval);
    }, []);

    // Fetch todos when screen focuses
    useFocusEffect(
        useCallback(() => {
            const load = async () => {
                setLoading(true);
                try {
                    const data = await loadTodos();
                    setTodos(data);
                } catch (error) {
                    console.error("Error fetching todos:", error);
                } finally {
                    setLoading(false);
                }
            };
            load();
        }, [])
    );

    const toggleTodoHandler = async (id: number) => {
        const todo = todos.find((t) => t.id === id);
        if (!todo) return;
        const updated = { ...todo, completed: !todo.completed };
        try {
            await updateTodo(id, updated);
            setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
        } catch (error) {
            console.error("Error updating todo:", error);
        }
    };

    const deleteTodoHandler = async (id: number) => {
        try {
            await deleteTodo(id);
            setTodos((prev) => prev.filter((t) => t.id !== id));
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    const editTodoHandler = async (id: number, newTitle: string) => {
        const todo = todos.find((t) => t.id === id);
        if (!todo) return;
        const updated = { ...todo, title: newTitle };
        try {
            await updateTodo(id, updated);
            setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
        } catch (error) {
            console.error("Error editing todo:", error);
        }
    };

    const filteredTodos = todos
        .filter((t) => {
            if (activeTab === "active") return !t.completed;
            if (activeTab === "completed") return t.completed;
            return true;
        })
        .filter((t) =>
            t.title.toLowerCase().includes(searchTitle.toLowerCase())
        );

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.header, { height: headerHeight }]}>
                <View style={styles.headerTop}>
                    <View>
                        <UrbanistBold style={styles.dateText}>
                            {currentDate || "Today"}
                        </UrbanistBold>
                        <UrbanistLight style={styles.taskCount}>
                            {filteredTodos.length} tasks
                        </UrbanistLight>
                    </View>
                    <TouchableOpacity
                        onPress={() => router.push("/(tabs)/add")}
                        style={styles.addButton}
                    >
                        <Entypo name="plus" size={20} color="#4A3780" />
                        <UrbanistRegular style={styles.addText}>
                            Add Task
                        </UrbanistRegular>
                    </TouchableOpacity>
                </View>

                <View style={styles.searchWrapper}>
                    <Feather name="search" size={24} color="white" />
                    <TextInput
                        placeholder="Search tasks..."
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        value={searchTitle}
                        onChangeText={setSearchTitle}
                        style={styles.searchInput}
                    />
                </View>
            </View>

            {loading ? (
                <ActivityIndicator size="large" style={{ flex: 1 }} />
            ) : (
                <View style={styles.scrollContainer}>
                    <View style={styles.tabRow}>
                        {(["all", "active", "completed"] as const).map(
                            (tab) => (
                                <TouchableOpacity
                                    key={tab}
                                    onPress={() => setActiveTab(tab)}
                                    style={[
                                        styles.tab,
                                        activeTab === tab && styles.activeTab,
                                    ]}
                                >
                                    <UrbanistRegular
                                        style={
                                            activeTab === tab
                                                ? styles.activeTabText
                                                : styles.inactiveTabText
                                        }
                                    >
                                        {tab.charAt(0).toUpperCase() +
                                            tab.slice(1)}
                                    </UrbanistRegular>
                                </TouchableOpacity>
                            )
                        )}
                    </View>

                    <ScrollView
                        style={styles.scrollView}
                        contentContainerStyle={styles.scrollContent}
                    >
                        {filteredTodos.map((todo, index) => (
                            <TodoComponent
                                key={todo.id}
                                todo={todo}
                                onToggle={toggleTodoHandler}
                                onDelete={deleteTodoHandler}
                                onEdit={editTodoHandler}
                                bgColor={BgIconColors[index % 3].bg}
                                iconColor={BgIconColors[index % 3].icon}
                            />
                        ))}
                    </ScrollView>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#4A3780" },
    header: { padding: 16, justifyContent: "space-between" },
    headerTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    dateText: { fontSize: 20, color: "white" },
    taskCount: { fontSize: 14, color: "white", marginTop: 4 },
    addButton: {
        flexDirection: "row",
        backgroundColor: "white",
        padding: 12,
        borderRadius: 12,
        alignItems: "center",
        gap: 8,
    },
    addText: { color: "#4A3780", marginLeft: 4 },
    searchWrapper: {
        flexDirection: "row",
        backgroundColor: "rgba(255,255,255,0.2)",
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 8,
        alignItems: "center",
        marginTop: 12,
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        color: "white",
        fontFamily: "Urbanist-Regular",
    },
    scrollContainer: {
        flex: 1,
        backgroundColor: "#F1F5F9",
        borderTopLeftRadius: 40,
        overflow: "hidden",
    },
    tabRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 16,
        marginBottom: 8,
    },
    tab: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20 },
    activeTab: { backgroundColor: "#4A3780" },
    activeTabText: { color: "white" },
    inactiveTabText: { color: "#666" },
    scrollView: { flex: 1, paddingVertical: 12 },
    scrollContent: { padding: 16, paddingBottom: 40 },
});
