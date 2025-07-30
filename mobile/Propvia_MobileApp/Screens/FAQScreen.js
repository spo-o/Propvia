import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../ThemeContext';
import { useNavigation } from '@react-navigation/native';

export default function FAQScreen() {
  const { colors, isDark } = useTheme();
  const navigation = useNavigation();

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: 50 }} // ensures space for button
    >
      {/* Back to Info */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backButton}>← Back to Info</Text>
      </TouchableOpacity>

      {/* Header */}
      <Text style={[styles.header, { color: colors.text }]}>FAQ</Text>
      <Text style={[styles.paragraph, { color: colors.description }]}>
        Find answers to the most common questions about Propvia, from how our analysis works to 
        what plans we offer.
      </Text>

      {/* FAQ ITEMS */}
      {faqData.map((faq, index) => (
        <View key={index} style={styles.faqBlock}>
          <Text style={[styles.faqQuestion, { color: colors.text }]}>{faq.question}</Text>
          <Text style={[styles.faqAnswer, { color: colors.description }]}>{faq.answer}</Text>
        </View>
      ))}

      {/* Contact Support Button */}
      <View style={{ marginTop: 20 }}>
        <TouchableOpacity
          style={[
            styles.contactButton,
            { backgroundColor: isDark ? '#F7C948' : '#004040' }
          ]}
        >
          <Text style={[
            styles.contactButtonText,
            { color: isDark ? '#222' : '#fff' }
          ]}>
            Contact Support
          </Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

const faqData = [
  {
    question: "What is Propvia?",
    answer: "Propvia is an AI-powered commercial property analysis platform that helps businesses make data-driven real estate decisions through advanced analytics and market insights."
  },
  {
    question: "How accurate are the property analyses?",
    answer: "Our analyses are based on comprehensive data from multiple reliable sources and use advanced AI algorithms. While we strive for high accuracy, we recommend using our insights as part of a broader due diligence process."
  },
  {
    question: "What subscription plans do you offer?",
    answer: "We offer several plans ranging from Free to Enterprise, each with different features and capabilities. Visit our pricing page to compare plans and find the best fit for your needs."
  },
  {
    question: "Can I export analysis reports?",
    answer: "Yes, all paid plans include the ability to export detailed PDF reports of your property analyses, which can be shared with stakeholders or used for presentations."
  },
  {
    question: "How often is market data updated?",
    answer: "Our market data is updated in real-time for most metrics, with some specialized data points updated on a weekly or monthly basis, depending on the source."
  },
  {
    question: "Do you offer custom solutions?",
    answer: "Yes, our Enterprise plan includes custom features, integrations, and dedicated support. Contact our sales team to discuss your specific needs."
  }
];

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
  faqBlock: {
    marginBottom: 20,
  },
  faqQuestion: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  faqAnswer: {
    fontSize: 15,
    lineHeight: 22,
  },
  contactButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 10,
  },
  contactButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});