import { View, StyleSheet } from 'react-native';
import React from 'react';
import { UrbanistMedium } from '../StyledText';
import { Link } from 'expo-router';

const BottomLinks = ({ type }: { type: string }) => {
    return (
      <View style={styles.bottomTextContainer}>
        {type === 'register' ? (
          <View style={styles.linkContainer}>
            <UrbanistMedium style={styles.bottomText}>Have an account?</UrbanistMedium>
            <Link href={'/(auth)/login'} asChild>
                <UrbanistMedium style={styles.linkText}>Login</UrbanistMedium>
              
            </Link>
          </View>
        ) : (
          <View style={styles.linkContainer}>
            <UrbanistMedium style={styles.bottomText}>Dont have an account? </UrbanistMedium>
            <Link href={'/(auth)/register'} asChild>
                <UrbanistMedium style={styles.linkText}>Register</UrbanistMedium>
              
            </Link>
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
