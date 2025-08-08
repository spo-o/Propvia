import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { useTheme } from '../ThemeContext';
import Footer from './Footer';

export default function ScreenWrapper({ children }) {
  const { colors } = useTheme();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={styles.container}
    >
      {children}
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 40,
  },
});