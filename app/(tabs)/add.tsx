import { UrbanistBold } from '@/components/StyledText';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Todos() {
  const screenHeight = Dimensions.get('window').height;
  const headerHeight = screenHeight * 0.15;

  return (
    <SafeAreaView className="flex-1 bg-[#4A3780]"> 
      <View style={[styles.header, { height: headerHeight }]}>
        <UrbanistBold className="text-white text-5xl">Add</UrbanistBold>
      </View>
      
      <View style={styles.scrollContainer}> 
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.content}>
            <UrbanistBold className="text-black text-xl">
              Scrollable Content
            </UrbanistBold>
            <View style={{height: 1000}}></View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#4A3780',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: 'white',
    overflow: 'hidden', 
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  content: {
    flex: 1,
  },
});
