import AuthForm from '@/components/common/AuthForm';
import React from 'react';
import { View } from 'react-native';

const Register = () => {
  const handleSubmit = (data: AuthFormData) => {
    console.log('Register data:', data);
  };

  return (
    <View style={{ flex: 1 }}>
      <AuthForm type="register" onSubmit={handleSubmit} title='Register' />
    </View>
  );
};

export default Register;
