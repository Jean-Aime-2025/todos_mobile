import AuthForm from '@/components/common/AuthForm';
import React from 'react';
import { View } from 'react-native';

const Login = () => {
  const handleSubmit = (data: AuthFormData) => {
    console.log('Login data:', data);
  };

  return (
    <View style={{ flex: 1 }}>
      <AuthForm type="login" onSubmit={handleSubmit} title='Login' />
    </View>
  );
};

export default Login;