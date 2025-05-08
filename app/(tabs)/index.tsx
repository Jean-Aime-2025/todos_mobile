import {
  UrbanistBold,
  UrbanistLight,
  UrbanistRegular,
} from '@/components/StyledText';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import TodoComponent from '@/components/common/TodoComponent';

const BgIconColors = [
  { bg: '#DBECF6', icon: '#194A66' },
  { bg: '#403100', icon: '#FEF5D3' },
  { bg: '#4A3780', icon: '#E7E2F3' },
];

const initialTodos: Todo[] = [
  {
    id: 1,
    title: 'Complete project presentation',
    completed: false,
    createdAt: new Date(),
  },
  {
    id: 2,
    title: 'Buy groceries',
    completed: false,
    createdAt: new Date(),
  },
  {
    id: 3,
    title: 'Call mom',
    completed: false,
    createdAt: new Date(),
  },
  {
    id: 4,
    title: 'Go for a run',
    completed: true,
    createdAt: new Date(),
  },
  {
    id: 5,
    title: 'Read 30 pages of book',
    completed: false,
    createdAt: new Date(),
  },
];

export default function Home() {
  const screenHeight = Dimensions.get('window').height;
  const headerHeight = screenHeight * 0.25;
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [currentDate, setCurrentDate] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentTime, setCurrentTime] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed'>(
    'all'
  );

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDate(
        now.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
        })
      );
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
      );
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const filteredTodos = () => {
    switch (activeTab) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id: number, newTitle: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, title: newTitle } : todo
    ));
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

        <View className="w-full bg-white/20 rounded-full px-4 py-1 flex-row items-center">
          <Feather name="search" size={24} color="white" />
          <TextInput
            placeholder="Search tasks..."
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            className="flex-1 ml-3 text-white"
            style={{ fontFamily: 'Urbanist-Regular' }}
          />
        </View>
      </View>

      <View style={styles.scrollContainer}>
        <View className="flex flex-row justify-around mt-4 mb-2">
          <TouchableOpacity
            onPress={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-full ${
              activeTab === 'all' ? 'bg-[#4A3780]' : ''
            }`}
          >
            <UrbanistRegular
              className={activeTab === 'all' ? 'text-white' : 'text-gray-600'}
            >
              All
            </UrbanistRegular>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('active')}
            className={`px-4 py-2 rounded-full ${
              activeTab === 'active' ? 'bg-[#4A3780]' : ''
            }`}
          >
            <UrbanistRegular
              className={
                activeTab === 'active' ? 'text-white' : 'text-gray-600'
              }
            >
              Active
            </UrbanistRegular>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('completed')}
            className={`px-4 py-2 rounded-full ${
              activeTab === 'completed' ? 'bg-[#4A3780]' : ''
            }`}
          >
            <UrbanistRegular
              className={
                activeTab === 'completed' ? 'text-white' : 'text-gray-600'
              }
            >
              Completed
            </UrbanistRegular>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          {filteredTodos().map((todo, index) => (
        <TodoComponent
          key={todo.id}
          todo={todo}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
          bgColor={BgIconColors[index % 3].bg}
          iconColor={BgIconColors[index % 3].icon}
        />
      ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
