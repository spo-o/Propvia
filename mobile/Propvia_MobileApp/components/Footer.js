import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../ThemeContext';

export default function Footer() {
  const { isDark } = useTheme();

  return (
    <View style={[styles.footer, { borderTopColor: isDark ? '#333' : '#ccc' }]}>
      <Text style={[styles.footerText, { color: isDark ? '#aaa' : '#666' }]}>
        © 2025 Propvia · Terms · Privacy · Contact
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    alignItems: 'center',
    marginTop: 32,
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
  },
});