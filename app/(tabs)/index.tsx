import { useCallback, useState } from "react";
import { View, FlatList, Alert, TextInput } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";

import { fetchTodos, createTodo, deleteTodo, updateTodo } from "../../services/api";
// import TodoItem from "../components/TodoItem";
import { TouchableOpacity } from "react-native-gesture-handler";
import { UrbanistRegular, UrbanistSemiBold } from "@/components/StyledText";

export default function Home() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [searchTitle, setSearchTitle] = useState("");

    // Load todos when the screen is focused
useFocusEffect(
    useCallback(() => {
        const fetchData = async () => {
            try {
                const data = await fetchTodos(); // fetchTodos should return Todo[] here
                if (Array.isArray(data)) {
                    setTodos(data); // Set the state with the fetched Todo array
                } else {
                    console.error("Fetched data is not an array:", data);
                }
            } catch (error) {
                console.log("Error fetching todos:", error);
            }
        };

        fetchData();
    }, [])
);


    const handleAddTodo = async () => {
        try {
            const newTodo = await createTodo({
                title: "New Todo",
                completed: false,
            });
            setTodos((prevTodos) => [...prevTodos, newTodo]);
        } catch (error) {
            console.log("Error adding todo:", error);
        }
    };

    const handleDeleteTodo = async (id: number) => {
        try {
            await deleteTodo(id);
            setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
        } catch (error) {
            console.log("Error deleting todo:", error);
        }
    };

    const handleToggleCompleted = async (id: number) => {
        try {
            const todo = todos.find((t) => t.id === id);
            if (!todo) return;

            const updatedTodo = { ...todo, completed: !todo.completed };
            await updateTodo(id, updatedTodo);

            setTodos((prevTodos) =>
                prevTodos.map((t) => (t.id === id ? updatedTodo : t))
            );
        } catch (error) {
            console.log("Error updating todo:", error);
        }
    };

    const handleEditTodo = async (id: number, newTitle: string) => {
        try {
            const todo = todos.find((t) => t.id === id);
            if (!todo) return;

            const updatedTodo = { ...todo, title: newTitle };
            await updateTodo(id, updatedTodo);

            setTodos((prevTodos) =>
                prevTodos.map((t) => (t.id === id ? updatedTodo : t))
            );
        } catch (error) {
            console.log("Error editing todo:", error);
        }
    };

    const getTodoByTitle = (title: string) => {
        const foundTodo = todos.find(
            (todo) => todo.title.toLowerCase() === title.toLowerCase()
        );
        if (foundTodo) {
            Alert.alert(
                "Todo Found",
                `Title: ${foundTodo.title}\nCompleted: ${
                    foundTodo.completed ? "Yes" : "No"
                }`
            );
        } else {
            Alert.alert("Not Found", `No todo found with title: "${title}"`);
        }
        return foundTodo;
    };

    return (
        <View className="flex-1 bg-white pt-12">
            <View className="px-4 mb-3">
                <UrbanistSemiBold className="text-xl text-black">
                    Todo List
                </UrbanistSemiBold>
            </View>

            <FlatList
                data={todos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TodoItem
                        todo={item}
                        onDelete={handleDeleteTodo}
                        onToggleCompleted={handleToggleCompleted}
                        onEdit={handleEditTodo}
                    />
                )}
                contentContainerStyle={{ paddingBottom: 100 }}
            />

            <View className="px-4 mt-4">
                <TouchableOpacity
                    className="bg-[#4A3780] p-3 rounded-xl items-center"
                    onPress={handleAddTodo}
                >
                    <UrbanistSemiBold className="text-white">
                        Add Todo
                    </UrbanistSemiBold>
                </TouchableOpacity>
            </View>

            {/* Search by Title */}
            <View className="flex-row gap-2 mt-4 px-4">
                <TextInput
                    placeholder="Enter title to search"
                    placeholderTextColor="#999"
                    onChangeText={setSearchTitle}
                    value={searchTitle}
                    className="bg-white border border-gray-300 px-3 py-2 flex-1 rounded-xl"
                />
                <TouchableOpacity
                    className="bg-[#4A3780] px-4 justify-center rounded-xl"
                    onPress={() => getTodoByTitle(searchTitle)}
                >
                    <UrbanistRegular className="text-white">
                        Search
                    </UrbanistRegular>
                </TouchableOpacity>
            </View>
        </View>
    );
}
