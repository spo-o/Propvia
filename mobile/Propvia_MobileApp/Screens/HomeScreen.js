import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useTheme } from '../ThemeContext';

export default function HomeScreen({ navigation }) {
  const { colors, isDark } = useTheme();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80' }}
          style={styles.heroImage}
        />
        <View style={styles.heroOverlay}>
          <Text style={[styles.heroTitle, { color: isDark ? '#fff' : '#111' }]}>
            Turn Vacant Properties into <Text style={styles.accent}>Community Assets</Text>
          </Text>
          <Text style={[styles.heroSubtitle, { color: isDark ? '#ddd' : '#333' }]}>
            Detroit has over 30,000 vacant properties. Our AI platform analyzes zoning, foot traffic, and community needs to recommend high-impact opportunities—from cafés to daycares.
          </Text>
          <TouchableOpacity style={styles.ctaButton} onPress={() => navigation.navigate('PropertyExplorer')}>
            <Text style={styles.ctaButtonText}>Get Free Property Analysis</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.secondaryButton, { borderColor: isDark ? '#fff' : '#444' }]}
            onPress={() => navigation.navigate('Information')}
          >
            <Text style={[styles.secondaryButtonText, { color: isDark ? '#fff' : '#444' }]}>Learn More</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Impact Stats */}
      <View style={[styles.statsSection, { backgroundColor: colors.background }]}>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: isDark ? '#F7C948' : '#444' }]}>30K+</Text>
          <Text style={[styles.statLabel, { color: isDark ? '#ccc' : '#444' }]}>Vacant Properties</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: isDark ? '#F7C948' : '#444' }]}>85%</Text>
          <Text style={[styles.statLabel, { color: isDark ? '#ccc' : '#444' }]}>Analysis Accuracy</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: isDark ? '#F7C948' : '#444' }]}>$2.1B</Text>
          <Text style={[styles.statLabel, { color: isDark ? '#ccc' : '#444' }]}>Investment Potential</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: isDark ? '#F7C948' : '#444' }]}>12K+</Text>
          <Text style={[styles.statLabel, { color: isDark ? '#ccc' : '#444' }]}>Jobs Created</Text>
        </View>
      </View>

      {/* Who We Serve */}
       <View style={[styles.sectionWhite, { backgroundColor: isDark ? colors.background : '#f8f8f8' }]}>
        <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#111' }]}>Who We Serve</Text>
        <View style={styles.cardGroup}>
          <View style={[styles.card, { backgroundColor: isDark ? '#2d2f33' : '#fff' }]}>
            <Text style={[styles.cardTitle, { color: isDark ? '#fff' : '#111' }]}>For Investors</Text>
            <Text style={[styles.cardText, { color: colors.description }]}>Buy properties with 200%+ ROI potential. AI predicts cash flow, identifies hidden risks, and checks zoning laws in 60 seconds.</Text>
          </View>
          <View style={[styles.card, { backgroundColor: isDark ? '#2d2f33' : '#fff' }]}>
            <Text style={[styles.cardTitle, { color: isDark ? '#fff' : '#111' }]}>For Small Businesses</Text>
            <Text style={[styles.cardText, { color: colors.description }]}>Open your dream business with 98% confidence. AI tells you which location will match your goals and maximize profit.</Text>
          </View>
          <View style={[styles.card, { backgroundColor: isDark ? '#2d2f33' : '#fff' }]}>
            <Text style={[styles.cardTitle, { color: isDark ? '#fff' : '#111' }]}>For Municipalities</Text>
            <Text style={[styles.cardText, { color: colors.description }]}>Cut vacancy rates and boost tax revenue. AI analyzes projects that increase jobs and community value.</Text>
          </View>
        </View>
      </View>

      {/* How It Works */}
      <View style={[styles.sectionWhite, { backgroundColor: isDark ? colors.background : '#f8f8f8' }]}>
        <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : '#111' }]}>How It Works</Text>
        <View style={styles.stepGroup}>
          <View style={styles.stepCard}>
            <Text style={[styles.stepCircle, { backgroundColor: isDark ? '#F7C948' : '#004040', color: isDark ? '#111' : '#fff'  }]}>1</Text>
            <Text style={[styles.cardTitle, { color: isDark ? '#fff' : '#111' }]}>Select Property</Text>
            <Text style={[styles.cardText, { color: colors.description }]}>Choose any vacant property in Detroit or enter an address for instant analysis</Text>
          </View>
          <View style={styles.stepCard}>
            <Text style={[styles.stepCircle, { backgroundColor: isDark ? '#F7C948' : '#004040', color: isDark ? '#111' : '#fff'  }]}>2</Text>
            <Text style={[styles.cardTitle, { color: isDark ? '#fff' : '#111' }]}>AI Analysis</Text>
            <Text style={[styles.cardText, { color: colors.description }]}>Get comprehensive 57-point analysis of property potential and community impact</Text>
          </View>
          <View style={styles.stepCard}>
            <Text style={[styles.stepCircle, { backgroundColor: isDark ? '#F7C948' : '#004040', color: isDark ? '#111' : '#fff' }]}>3</Text>
            <Text style={[styles.cardTitle, { color: isDark ? '#fff' : '#111' }]}>Take Action</Text>
            <Text style={[styles.cardText, { color: colors.description }]}>Receive detailed recommendations, financial projections, and next steps</Text>
          </View>
        </View>
      </View>

      {/* Final CTA Section */}
      <View style={styles.ctaSection}>
        <Text style={styles.ctaTitle}>Ready to Transform Detroit?</Text>
        <Text style={styles.ctaSubtitle}>Join us in revitalizing Detroit's neighborhoods while building profitable businesses that serve community needs.</Text>
        <TouchableOpacity style={styles.ctaButtonLarge} onPress={() => navigation.navigate('PropertyExplorer')}>
          <Text style={styles.ctaButtonText}>Start Free Analysis</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  heroSection: {
    height: 500,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    resizeMode: 'cover',
    opacity: 0.2,
  },
  heroOverlay: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  accent: {
    color: '#F7C948',
  },
  heroSubtitle: {
    color: '#ddd',
    fontSize: 16,
    marginBottom: 16,
  },
  ctaButton: {
    backgroundColor: '#F7C948',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  secondaryButton: {
    borderColor: '#fff',
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  ctaButtonText: {
    fontWeight: 'bold',
    color: '#000',
  },
  secondaryButtonText: {
    color: '#fff',
  },
  statsSection: {
    backgroundColor: '#fff',
    paddingVertical: 32,
    paddingHorizontal: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  statCard: {
    alignItems: 'center',
    marginVertical: 12,
    width: '45%',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004040',
  },
  statLabel: {
    color: '#444',
    textAlign: 'center',
  },
  sectionWhite: {
    backgroundColor: '#f8f8f8',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  cardGroup: {
    gap: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  cardText: {
    color: '#444',
  },
  stepGroup: {
    gap: 16,
  },
  stepCard: {
    alignItems: 'center',
    marginBottom: 20,
  },
  stepCircle: {
    backgroundColor: '#004040',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    width: 40,
    height: 40,
    textAlign: 'center',
    lineHeight: 35,
    borderRadius: 20,
  },
  ctaSection: {
    backgroundColor: '#004040',
    paddingVertical: 48,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  ctaTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  ctaSubtitle: {
    color: '#eee',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  ctaButtonLarge: {
    backgroundColor: '#F7C948',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 24,
  },
  footerLinks: {
    borderTopColor: '#044',
    borderTopWidth: 1,
    paddingTop: 12,
  },
  footerText: {
    color: '#ccc',
    textAlign: 'center',
    fontSize: 12,
  },
});