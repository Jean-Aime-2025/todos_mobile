import { useEffect, useState } from "react";
import {
    fetchTodos,
    createTodo,
    deleteTodo,
    updateTodo,
} from "../services/api";

export function useTodos() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadTodos();
    }, [todos]);

    const loadTodos = async (): Promise<Todo[]> => {
        setLoading(true);
        try {
            const data = await fetchTodos();
            const sorted = [...data].sort((a, b) => b.id - a.id);
            setTodos(sorted);
            return sorted;
        } catch (err) {
            setError("Failed to fetch todos");
            return []; // <-- Always return a fallback array
        } finally {
            setLoading(false);
        }
    };


    const addTodo = async (newTodo: Todo) => {
        try {
            // Assuming you have a backend API service to save a new todo
            const response = await createTodo(newTodo); // <-- Ensure `createTodo` is correct
            setTodos((prevTodos) => [...prevTodos, response]); // Update local state
        } catch (err) {
            throw new Error("Error adding todo");
        }
    };




    const removeTodo = async (id: number) => {
        try {
            await deleteTodo(id);
            setTodos((prev) => prev.filter((todo) => todo.id !== id));
        } catch (err) {
            console.error("Failed to delete todo", err);
        }
    };

    const editTodo = async (id: number, updates: Partial<Todo>) => {
        try {
            const updated = await updateTodo(id, updates);
            setTodos((prev) =>
                prev.map((todo) =>
                    todo.id === id ? { ...todo, ...updated } : todo
                )
            );
        } catch (err) {
            console.error("Failed to update todo", err);
        }
    };

     const toggleTodo = async (id: number) => {
         const todo = todos.find((t) => t.id === id);
         if (!todo) return;
         await editTodo(id, { completed: !todo.completed });
     };


    return {
        todos,
        loading,
        error,
        addTodo,
        removeTodo,
        editTodo,
        toggleTodo,
        loadTodos,
    };
}
