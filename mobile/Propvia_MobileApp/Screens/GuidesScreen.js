import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../ThemeContext';
import { useNavigation } from '@react-navigation/native';

export default function GuidesScreen() {
  const { colors, isDark } = useTheme();
  const navigation = useNavigation();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      
      {/* Back to Info */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backButton}>← Back to Info</Text>
      </TouchableOpacity>

      {/* Header */}
      <Text style={[styles.header, { color: colors.text }]}>Guides & Resources</Text>
      <Text style={[styles.paragraph, { color: colors.description }]}>
        Everything you need to know about commercial property analysis and investment. 
        Browse our comprehensive guides and download helpful resources.
      </Text>

      {/* Guide Cards */}
      <TouchableOpacity style={[
        styles.guideCard,
        { backgroundColor: isDark ? '#2D2F33' : '#f2f2f2' }
      ]}>
        <Text style={[
          styles.guideTitle,
          { color: isDark ? '#fff' : '#000' }
        ]}>
          Platform Guide
        </Text>
        <Text style={[
          styles.guideDescription,
          { color: isDark ? '#ccc' : '#333' }
        ]}>
          Learn how to use our platform to analyze commercial properties and make data-driven investment decisions.
        </Text>
        <Text style={styles.readGuide}>Read Guide →</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[
        styles.guideCard,
        { backgroundColor: isDark ? '#2d2f33' : '#f2f2f2' }
      ]}>
        <Text style={[
          styles.guideTitle,
          { color: isDark ? '#fff' : '#000' }
        ]}>
          Analysis Guide
        </Text>
        <Text style={[
          styles.guideDescription,
          { color: isDark ? '#ccc' : '#333' }
        ]}>
          Deep dive into the key metrics we use to evaluate commercial properties and their potential.
        </Text>
        <Text style={styles.readGuide}>Read Guide →</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[
        styles.guideCard,
        { backgroundColor: isDark ? '#2d2f33' : '#f2f2f2' }
      ]}>
        <Text style={[
          styles.guideTitle,
          { color: isDark ? '#fff' : '#000' }
        ]}>
          Investment Guide
        </Text>
        <Text style={[
          styles.guideDescription,
          { color: isDark ? '#ccc' : '#333' }
        ]}>
          Comprehensive overview of different commercial property types and their characteristics.
        </Text>
        <Text style={styles.readGuide}>Read Guide →</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    fontSize: 16,
    color: '#F7C948',
    marginBottom: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  guideCard: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  guideTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  guideDescription: {
    fontSize: 14,
    marginBottom: 10,
  },
  readGuide: {
    fontSize: 14,
    color: '#F7C948',
    fontWeight: '600',
  },
});