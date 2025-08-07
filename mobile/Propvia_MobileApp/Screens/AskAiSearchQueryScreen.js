import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AskAiSearchQueryScreen() {
  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!query.trim()) return;
    Keyboard.dismiss();
    setIsLoading(true);
    // TODO: Send query to API
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const clearQuery = () => {
    setQuery('');
  };

  const exampleQuestions = [
    'Find me a retail space for a coffee shop under $300k in downtown areas',
    'Best neighborhoods for rental property investment with high ROI',
    'Where should I open a co-working space with good foot traffic?',
    'Affordable commercial spaces suitable for a fitness studio'
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Ask Our AI Assistant</Text>
      <Text style={styles.subtitle}>Describe your investment goals and get personalized property recommendations powered by AI.</Text>

      <TextInput
        style={styles.input}
        multiline
        placeholder="What are you trying to build or invest in?"
        value={query}
        onChangeText={setQuery}
        editable={!isLoading}
      />
      <Text style={styles.charCount}>{query.length}/500</Text>

      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[styles.submitButton, (!query.trim() || isLoading) && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={!query.trim() || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitText}>Submit Query</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.clearButton, (!query || isLoading) && styles.disabledButton]}
          onPress={clearQuery}
          disabled={!query || isLoading}
        >
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.examplesTitle}>Need inspiration? Try these examples:</Text>
      {exampleQuestions.map((example, index) => (
        <TouchableOpacity
          key={index}
          style={styles.exampleCard}
          onPress={() => setQuery(example)}
          disabled={isLoading}
        >
          <Text style={styles.exampleText}>“{example}”</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    minHeight: 100,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  charCount: {
    textAlign: 'right',
    color: '#999',
    marginTop: 4,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
    gap: 10,
  },
  submitButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  clearButton: {
    backgroundColor: '#f3f4f6',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  clearText: {
    color: '#111827',
    fontWeight: 'bold',
  },
  disabledButton: {
    opacity: 0.5,
  },
  examplesTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  exampleCard: {
    backgroundColor: '#f9fafb',
    borderColor: '#e5e7eb',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  exampleText: {
    fontSize: 14,
    color: '#333',
  },
});