// useTodos.ts
import { useEffect, useState } from "react";
import { fetchTodos, createTodo, deleteTodo, updateTodo } from '../services/api';

export function useTodos() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadTodos();
    }, []);

    const loadTodos = async () => {
        setLoading(true);
        try {
            const data = await fetchTodos();
            setTodos(data);
        } catch (err) {
            setError("Failed to fetch todos");
        } finally {
            setLoading(false);
        }
    };

    const addTodo = async (todo: Omit<Todo, "id">) => {
        const newTodo = await createTodo(todo);
        setTodos((prev) => [newTodo, ...prev]);
    };

    const removeTodo = async (id: number) => {
        await deleteTodo(id);
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };

    const editTodo = async (id: number, updates: Partial<Todo>) => {
        const updated = await updateTodo(id, updates);
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, ...updated } : todo
            )
        );
    };

    return {
        todos,
        loading,
        error,
        addTodo,
        removeTodo,
        editTodo,
        reload: loadTodos,
    };
}
