import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AskAiLandingScreen() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const exampleQuestions = [
    'Where should I open a daycare?',
    'Best place for a small café under $200k',
    'Which areas are good for a coworking hub?',
    'Where can I find retail space for a boutique?',
    'Best neighborhoods for a fitness studio?',
    'Where should I invest in rental properties?',
  ];

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: isDark ? '#111' : '#f1f5f9' }]}>
      <View style={styles.wrapper}>
        <Text style={[styles.heading, { color: isDark ? '#fff' : '#111' }]}>Find Your Perfect
          <Text style={styles.gradientText}> Investment Location</Text>
        </Text>

        <Text style={[styles.subheading, { color: isDark ? '#ccc' : '#555' }]}>Ask natural language questions and receive smart, personalized recommendations for real estate investment and development opportunities.</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('AskAiQuery')}
          style={styles.askButton}
        >
          <Text style={styles.askButtonText}>Try Ask-AI</Text>
        </TouchableOpacity>

        <Text style={[styles.exampleTitle, { color: isDark ? '#ccc' : '#333' }]}>Try these example questions:</Text>

        <View style={styles.grid}>
          {exampleQuestions.map((question, idx) => (
            <View key={idx} style={[styles.card, { backgroundColor: isDark ? '#1e1e1e' : '#fff', borderColor: isDark ? '#333' : '#ddd' }]}>
              <Text style={[styles.cardText, { color: isDark ? '#ccc' : '#333' }]}>{question}</Text>
            </View>
          ))}
        </View>

        <View style={styles.infoSection}>
          <View style={[styles.infoCard, { backgroundColor: isDark ? '#1e1e1e' : '#fff' }]}>
            <Text style={[styles.infoTitle, { color: isDark ? '#fff' : '#111' }]}>Smart Analysis</Text>
            <Text style={[styles.infoText, { color: isDark ? '#aaa' : '#555' }]}>AI-powered analysis of opportunity scores, community metrics, and market trends to find the best locations.</Text>
          </View>

          <View style={[styles.infoCard, { backgroundColor: isDark ? '#1e1e1e' : '#fff' }]}>
            <Text style={[styles.infoTitle, { color: isDark ? '#fff' : '#111' }]}>Location Intelligence</Text>
            <Text style={[styles.infoText, { color: isDark ? '#aaa' : '#555' }]}>Comprehensive neighborhood data including zoning, demographics, and competitor analysis for informed decisions.</Text>
          </View>

          <View style={[styles.infoCard, { backgroundColor: isDark ? '#1e1e1e' : '#fff' }]}>
            <Text style={[styles.infoTitle, { color: isDark ? '#fff' : '#111' }]}>Personalized Results</Text>
            <Text style={[styles.infoText, { color: isDark ? '#aaa' : '#555' }]}>Tailored recommendations based on your budget, business type, and investment goals with detailed justifications.</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  wrapper: {
    flex: 1,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 12,
  },
  gradientText: {
    color: '#0891b2',
  },
  subheading: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  askButton: {
    backgroundColor: '#2563eb',
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginBottom: 30,
  },
  askButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  exampleTitle: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  card: {
    width: '48%',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  cardText: {
    fontSize: 14,
  },
  infoSection: {
    marginTop: 30,
  },
  infoCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 14,
    textAlign: 'center',
  },
});