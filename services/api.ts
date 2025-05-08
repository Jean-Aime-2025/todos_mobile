import { API_BASE_URL } from "../api.config";
const TODOS_URL = `${API_BASE_URL}/todos`;
export async function fetchTodos(): Promise<Todo[]> {
    const res = await fetch(TODOS_URL);
    return res.json();
}
export async function createTodo(todo: Omit<Todo, "id">): Promise<Todo> {
    const res = await fetch(TODOS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todo),
    });
    return res.json();
}
export async function deleteTodo(id: number): Promise<void> {
    await fetch(`${TODOS_URL}/${id}`, { method: "DELETE" });
}
export async function updateTodo(
    id: number,
    updatedTodo: Partial<Todo>
): Promise<Todo> {
    const res = await fetch(`${TODOS_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTodo),
    });
    return res.json();
}
