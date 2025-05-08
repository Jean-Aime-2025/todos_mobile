import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UrbanistBold, UrbanistMedium } from '../StyledText';
import { router } from 'expo-router';
import BottomLinks from './BottomLinks';

type AuthFormProps = {
  type: 'login' | 'register';
  onSubmit: (data: AuthFormData) => void;
  title: string;
};

type AuthFormData = {
  name?: string;
  email: string;
  username: string;
  password: string;
};

const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit, title }) => {
  const [formData, setFormData] = useState<AuthFormData>({
    name: '',
    email: '',
    username: '',
    password: '',
  });

  const handleChange = (field: keyof AuthFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    if (type === 'login') {
      router.push('/(tabs)');
    } else {
      router.push('/(auth)/login');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.formContainer}>
          <View style={styles.bottomTitleContainer}>
            <UrbanistBold style={{ fontSize: 24 }}>{title}</UrbanistBold>
          </View>
          {type === 'register' && (
            <View style={styles.inputGroup}>
              <UrbanistMedium style={styles.label}>Full Name</UrbanistMedium>
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                placeholderTextColor="#94A3B8"
                value={formData.name}
                onChangeText={(text) => handleChange('name', text)}
                autoCapitalize="words"
              />
            </View>
          )}

          <View style={styles.inputGroup}>
            <UrbanistMedium style={styles.label}>Email</UrbanistMedium>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#94A3B8"
              value={formData.email}
              onChangeText={(text) => handleChange('email', text)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <UrbanistMedium style={styles.label}>Username</UrbanistMedium>
            <TextInput
              style={styles.input}
              placeholder="Choose a username"
              placeholderTextColor="#94A3B8"
              value={formData.username}
              onChangeText={(text) => handleChange('username', text)}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <UrbanistMedium style={styles.label}>Password</UrbanistMedium>
            <TextInput
              style={styles.input}
              placeholder="Create a password"
              placeholderTextColor="#94A3B8"
              value={formData.password}
              onChangeText={(text) => handleChange('password', text)}
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <UrbanistMedium style={styles.buttonText}>
              {type === 'login' ? 'Login' : 'Register'}
            </UrbanistMedium>
          </TouchableOpacity>

          <BottomLinks type={type} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  inputGroup: {
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: '#334155',
    marginBottom: 8,
    marginLeft: 5,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#E2E8F0',
    borderWidth: 1,
    borderRadius: 40,
    paddingHorizontal: 20,
    fontSize: 14,
    backgroundColor: '#fff',
    color: '#0F172A',
    fontFamily: 'Urbanist-Regular',
  },
  placeholderStyle: {
    fontSize: 14,
    color: '#94A3B8',
  },
  button: {
    width: '100%',
    backgroundColor: '#4A3780',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  bottomTitleContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
});

export default AuthForm;
