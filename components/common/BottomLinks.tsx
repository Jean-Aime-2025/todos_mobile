import { View, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { UrbanistMedium } from '../StyledText';
import { useRouter, usePathname } from 'expo-router';

const BottomLinks = ({ type }: { type: string }) => {
  const router = useRouter();
  const pathname = usePathname();

  type ValidPaths = '/(auth)/login' | '/(auth)/register';

  const goTo = (path: ValidPaths) => {
    if (pathname !== path) {
      router.push(path);
    }
  };

  return (
    <View style={styles.bottomTextContainer}>
      {type === 'register' ? (
        <View style={styles.linkContainer}>
          <UrbanistMedium style={styles.bottomText}>
            Have an account?{' '}
          </UrbanistMedium>
          <Pressable onPress={() => goTo('/(auth)/login')}>
            <UrbanistMedium style={styles.linkText}>Login</UrbanistMedium>
          </Pressable>
        </View>
      ) : (
        <View style={styles.linkContainer}>
          <UrbanistMedium style={styles.bottomText}>
            Dont have an account?{' '}
          </UrbanistMedium>
          <Pressable onPress={() => goTo('/(auth)/register')}>
            <UrbanistMedium style={styles.linkText}>Register</UrbanistMedium>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default BottomLinks;

const styles = StyleSheet.create({
  bottomTextContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomText: {
    fontSize: 14,
    color: '#334155',
  },
  linkText: {
    fontSize: 14,
    color: '#4A3780',
    textDecorationLine: 'underline',
  },
});
