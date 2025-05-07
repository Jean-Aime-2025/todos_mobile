import { View, TouchableOpacity, Alert, TextInput } from 'react-native';
import { UrbanistRegular, UrbanistLight } from '@/components/StyledText';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Checkbox } from 'expo-checkbox';
import { useState } from 'react';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';

interface TodoComponentProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newTitle: string) => void;
  bgColor: string;
  iconColor: string;
}

const TodoComponent = ({ 
  todo, 
  onToggle, 
  onDelete, 
  onEdit, 
  bgColor, 
  iconColor 
}: TodoComponentProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const handleEdit = () => {
    if (editedTitle.trim() === '') {
      Alert.alert('Error', 'Todo title cannot be empty');
      return;
    }
    onEdit(todo.id, editedTitle);
    setIsEditing(false);
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Todo',
      'Are you sure you want to delete this todo?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDelete(todo.id),
        },
      ]
    );
  };

  return (
    <View className="bg-white rounded-2xl mb-3 p-4">
      <View className="flex flex-row items-center justify-between w-full">
        <View className="flex flex-row items-center gap-3 flex-1">
          <View style={{ backgroundColor: bgColor }} className="p-2 rounded-full">
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
              className="flex-1 border-b border-gray-300 py-1"
            />
          ) : (
            <View className="flex-1">
              <UrbanistRegular className={`text-xs ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                {todo.title}
              </UrbanistRegular>
              <UrbanistLight className="text-gray-500 text-xs">
                {todo.createdAt.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                })}
              </UrbanistLight>
            </View>
          )}
        </View>

        <View className="flex flex-row items-center gap-3">
          {!isEditing && (
            <>
              <TouchableOpacity onPress={() => setIsEditing(true)}>
                <Feather name="edit" size={16} color="#4A3780" />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDelete}>
                <Entypo name="trash" size={16} color="#FF3B30" />
              </TouchableOpacity>
            </>
          )}
          <Checkbox
            value={todo.completed}
            onValueChange={() => onToggle(todo.id)}
            color={todo.completed ? '#4A3780' : undefined}
            className='h-5 w-5'
          />
        </View>
      </View>
    </View>
  );
};

export default TodoComponent;