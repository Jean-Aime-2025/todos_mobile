import { UrbanistBold, UrbanistSemiBold } from "@/components/StyledText";
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    TextInput,
    Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import { useState } from "react";
import { useTodos } from '../../hooks/UseTodo'; // <-- Import your custom hook

export default function Todos() {
    const screenHeight = Dimensions.get("window").height;
    const headerHeight = screenHeight * 0.15;

    const { addTodo } = useTodos(); // <-- Extract addTodo from the hook
    const [title, setTitle] = useState("");

    const handleSave = async () => {
        if (!title.trim()) {
            Alert.alert("Validation", "Please enter a title for the todo");
            return;
        }

        try {
            await addTodo({ title, completed: false }); // Use hook to add todo
            Alert.alert("Success", "Todo added successfully");
            setTitle("");
            router.back(); // Go back after saving
        } catch (err) {
            Alert.alert("Error", "Failed to save todo");
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-[#4A3780]">
            <View style={[styles.header, { height: headerHeight }]}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="bg-white absolute left-3 flex items-center justify-center rounded-full w-10 h-10"
                >
                    <Entypo
                        name="chevron-thin-left"
                        size={20}
                        color="#4A3780"
                    />
                </TouchableOpacity>
                <UrbanistBold className="text-white text-2xl">
                    Add New Task
                </UrbanistBold>
            </View>

            <View style={styles.scrollContainer}>
                <View style={styles.content}>
                    <View className="flex flex-col gap-2">
                        <UrbanistBold>Todo Title</UrbanistBold>
                        <TextInput
                            placeholder="Enter todo title"
                            value={title}
                            onChangeText={setTitle}
                            className="border px-4 py-3 rounded-full bg-white border-gray-300"
                        />
                    </View>
                </View>

                <TouchableOpacity
                    onPress={handleSave}
                    className="w-full bg-primary py-3 rounded-full flex items-center justify-center"
                >
                    <UrbanistSemiBold className="text-white">
                        Save
                    </UrbanistSemiBold>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#4A3780",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        padding: 16,
        paddingVertical: 20,
    },
    scrollContainer: {
        flex: 1,
        backgroundColor: "#F1F5F9",
        overflow: "hidden",
        padding: 20,
        flexDirection: "column",
        justifyContent: "space-between",
    },
    content: {
        flex: 1,
    },
});

