import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../ThemeContext';

export default function GuidesScreen() {
  const { colors } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.text }]}>Guides</Text>
      <Text style={[styles.paragraph, { color: colors.description }]}>
        Access our comprehensive guides on property analysis, investment strategies, and using 
        Propvia’s tools for data-driven real estate decisions.
      </Text>
      {/* Add full guides later, or link to PDFs, etc. */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
  },
});