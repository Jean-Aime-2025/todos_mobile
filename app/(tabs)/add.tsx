import { UrbanistBold, UrbanistSemiBold } from '@/components/StyledText';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Entypo from '@expo/vector-icons/Entypo';
import { router } from 'expo-router';

export default function Todos() {
  const screenHeight = Dimensions.get('window').height;
  const headerHeight = screenHeight * 0.15;

  return (
    <SafeAreaView className="flex-1 bg-[#4A3780]">
      <View style={[styles.header, { height: headerHeight }]}>
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-white absolute left-3 flex items-center justify-center rounded-full w-10 h-10"
        >
          <Entypo name="chevron-thin-left" size={20} color="#4A3780" />
        </TouchableOpacity>
        <UrbanistBold style={{ color: 'white', fontSize: 24 }}>
          Add New Task
        </UrbanistBold>
      </View>

      <View style={styles.scrollContainer}>
        <View style={styles.content}>
          <View className="flex flex-col gap-2">
            <UrbanistBold>Todo Title</UrbanistBold>
            <TextInput
              placeholder="Enter todo title"
              placeholderTextColor="#94A3B8"
              style={{
                borderWidth: 1,
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderRadius: 9999,
                backgroundColor: 'white',
                borderColor: '#D1D5DB',
                fontFamily: 'Urbanist-Medium',
                fontSize: 16,
              }}
            />
          </View>
        </View>
        <TouchableOpacity className="w-full bg-primary py-3 rounded-full flex items-center justify-center">
          <UrbanistSemiBold style={{ color: 'white' }}>Save</UrbanistSemiBold>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#4A3780',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    padding: 16,
    paddingVertical: 20,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    overflow: 'hidden',
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
  },
});
