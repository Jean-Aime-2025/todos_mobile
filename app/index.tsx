import { Redirect } from 'expo-router';
import React from 'react';

const DefaultPage = () => {
  return <Redirect href="/(auth)/login" />;
};

export default DefaultPage;
