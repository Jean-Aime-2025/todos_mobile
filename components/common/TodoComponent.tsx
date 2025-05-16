import {
    View,
    TouchableOpacity,
    Alert,
    TextInput,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import { UrbanistRegular } from "@/components/StyledText";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Checkbox } from "expo-checkbox";
import { useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";

interface TodoComponentProps {
    todo: Todo;
    onToggle: (id: number) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
    onEdit: (id: number, newTitle: string) => Promise<void>;
    bgColor: string;
    iconColor: string;
}

const TodoComponent = ({
    todo,
    onToggle,
    onDelete,
    onEdit,
    bgColor,
    iconColor,
}: TodoComponentProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(todo.title);
    const [loading, setLoading] = useState(false);

    const handleEdit = async () => {
        if (editedTitle.trim() === "") {
            Alert.alert("Error", "Todo title cannot be empty");
            return;
        }
        setLoading(true);
        try {
            await onEdit(todo.id, editedTitle.trim());
            setIsEditing(false);
        } catch (error) {
            Alert.alert("Update failed", "Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = () => {
        Alert.alert(
            "Delete Todo",
            "Are you sure you want to delete this todo?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        setLoading(true);
                        try {
                            await onDelete(todo.id);
                        } catch {
                            Alert.alert("Delete failed", "Please try again.");
                        } finally {
                            setLoading(false);
                        }
                    },
                },
            ]
        );
    };

    const handleToggle = async () => {
        setLoading(true);
        try {
            await onToggle(todo.id);
        } catch {
            Alert.alert("Update failed", "Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.main}>
                    <View
                        style={[
                            styles.iconWrapper,
                            { backgroundColor: bgColor },
                        ]}
                    >
                        <MaterialIcons
                            name="sticky-note-2"
                            size={20}
                            color={iconColor}
                        />
                    </View>

                    {isEditing ? (
                        <TextInput
                            value={editedTitle}
                            onChangeText={setEditedTitle}
                            onSubmitEditing={handleEdit}
                            autoFocus
                            style={styles.input}
                            editable={!loading}
                        />
                    ) : (
                        <UrbanistRegular
                            style={[
                                styles.title,
                                todo.completed && styles.completed,
                            ]}
                        >
                            {todo.title}
                        </UrbanistRegular>
                    )}
                </View>

                <View style={styles.actions}>
                    {!isEditing && !loading && (
                        <>
                            <TouchableOpacity
                                onPress={() => setIsEditing(true)}
                            >
                                <Feather
                                    name="edit-2"
                                    size={16}
                                    color="#4A3780"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleDelete}>
                                <Entypo
                                    name="trash"
                                    size={16}
                                    color="#FF3B30"
                                />
                            </TouchableOpacity>
                        </>
                    )}

                    {loading ? (
                        <ActivityIndicator size="small" />
                    ) : (
                        <Checkbox
                            value={todo.completed}
                            onValueChange={handleToggle}
                            style={styles.checkbox}
                        />
                    )}
                </View>
            </View>
        </View>
    );
};

export default TodoComponent;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        borderRadius: 16,
        marginBottom: 12,
        padding: 16,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    main: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        marginRight: 8,
    },
    iconWrapper: { padding: 8, borderRadius: 999 },
    input: {
        flex: 1,
        borderBottomWidth: 1,
        borderColor: "#ccc",
        paddingVertical: 4,
        marginLeft: 8,
    },
    title: { flex: 1, fontSize: 14, marginLeft: 8, color: "#333" },
    completed: { textDecorationLine: "line-through", color: "#888" },
    actions: { flexDirection: "row", alignItems: "center", gap: 12 },
    checkbox: { width: 18, height: 18 },
});
