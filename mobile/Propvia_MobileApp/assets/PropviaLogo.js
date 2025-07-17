import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Svg, Path } from 'react-native-svg';

export default function PropviaLogo({ style, variant = 'default', color }) {
  // Use the color prop for drawer variant, otherwise use the default
  const strokeColor =
    variant === 'drawer'
      ? color || '#6B7280' // Use passed color or fallback to grey
      : '#004040';
  const size = variant === 'drawer' ? 24 : 28;

  const icon = (
    <Svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      style={style}
      fill="none"
    >
      <Path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" stroke={strokeColor} strokeWidth={2} strokeLinecap="round" />
      <Path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" stroke={strokeColor} strokeWidth={2} strokeLinecap="round" />
      <Path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" stroke={strokeColor} strokeWidth={2} strokeLinecap="round" />
      <Path d="M10 6h4" stroke={strokeColor} strokeWidth={2} strokeLinecap="round" />
      <Path d="M10 10h4" stroke={strokeColor} strokeWidth={2} strokeLinecap="round" />
      <Path d="M10 14h4" stroke={strokeColor} strokeWidth={2} strokeLinecap="round" />
      <Path d="M10 18h4" stroke={strokeColor} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );

  if (variant === 'drawer') {
    return icon;
  }

  return <View style={styles.iconContainer}>{icon}</View>;
}

const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: '#F7C948',
    padding: 6,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

