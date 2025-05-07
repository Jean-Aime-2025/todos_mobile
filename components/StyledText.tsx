import React from 'react';
import { Text, TextProps } from 'react-native';

export function UrbanistBold(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'Urbanist-Bold' }]} />;
}
export function UrbanistExtraBold(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'Urbanist-ExtraBold' }]} />;
}
export function UrbanistMedium(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'Urbanist-Medium' }]} />;
}
export function UrbanistRegular(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'Urbanist-Regular' }]} />;
}
export function UrbanistSemiBold(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'Urbanist-SemiBold' }]} />;
}
export function UrbanistLight(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'Urbanist-Light' }]} />;
}
export function UrbanistThin(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'Urbanist-Thin' }]} />;
}