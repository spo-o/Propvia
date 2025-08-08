import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Linking,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { useTheme } from '../ThemeContext';
import { Feather } from '@expo/vector-icons';

export default function SettingsScreen() {
  const { colors, isDark } = useTheme();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [marketingEmails, setMarketingEmails] = useState(true);
  const [weeklyNewsletter, setWeeklyNewsletter] = useState(false);

  const handleOpenWebsite = () => {
    Linking.openURL('https://propvia.com/');
  };

  return (
    <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={styles.scrollContainer}>
      <Text style={[styles.title, { color: colors.text }]}>Settings</Text>

      {/* Profile Info */}
      <View style={[styles.section, { borderColor: colors.border }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          <Feather name="user" size={16} color={colors.text} /> Profile Information
        </Text>

        <Text style={[styles.label, { color: colors.description }]}>Full Name</Text>
        <TextInput
          placeholder="John Doe"
          placeholderTextColor={colors.description}
          style={[styles.input, { borderColor: colors.border, color: colors.text }]}
          value={name}
          onChangeText={setName}
        />

        <Text style={[styles.label, { color: colors.description }]}>Email Address</Text>
        <TextInput
          placeholder="john@example.com"
          placeholderTextColor={colors.description}
          style={[styles.input, { borderColor: colors.border, color: colors.text }]}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Communication Preferences */}
      <View style={[styles.section, { borderColor: colors.border }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          <Feather name="bell" size={16} color={colors.text} /> Communication Preferences
        </Text>

        <View style={styles.toggleRow}>
          <View>
            <Text style={[styles.label, { color: colors.text }]}>Marketing Updates</Text>
            <Text style={[styles.toggleNote, { color: colors.description }]}>
              Receive emails about new features and updates
            </Text>
          </View>
          <Switch
            value={marketingEmails}
            onValueChange={setMarketingEmails}
            trackColor={{ false: '#ccc', true: '#004040' }}
            thumbColor={isDark ? '#fff' : '#fff'}
          />
        </View>

        <View style={styles.toggleRow}>
          <View>
            <Text style={[styles.label, { color: colors.text }]}>Weekly Newsletter</Text>
            <Text style={[styles.toggleNote, { color: colors.description }]}>
              Get weekly insights and market updates
            </Text>
          </View>
          <Switch
            value={weeklyNewsletter}
            onValueChange={setWeeklyNewsletter}
            trackColor={{ false: '#ccc', true: '#004040' }}
            thumbColor={isDark ? '#fff' : '#fff'}
          />
        </View>
      </View>

      {/* Subscription Plan */}
      <View style={[styles.section, { borderColor: colors.border }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          <Feather name="credit-card" size={16} color={colors.text} /> Subscription Plan
        </Text>

        <Text style={[styles.label, { color: colors.description }]}>Current Plan:</Text>
        <Text style={[styles.planName, { color: colors.text }]}>Free Plan</Text>
        <View style={{ marginTop: 12 }}>
          <Text style={[styles.planBullet, { color: colors.description }]}>• Basic market insights</Text>
          <Text style={[styles.planBullet, { color: colors.description }]}>• Standard reporting</Text>
          <Text style={[styles.planBullet, { color: colors.description }]}>• Email support</Text>
        </View>
        <Text style={[styles.note, { color: colors.description, marginTop: 16 }]}>
          <Feather name="info" size={14} color={colors.description} /> Additional plans coming soon!
        </Text>
      </View>

      {/* Website Button */}
      <TouchableOpacity onPress={handleOpenWebsite} style={[styles.websiteButton, { borderColor: colors.border }]}>
        <Text style={[styles.websiteText, { color: colors.text }]}>Visit Propvia Website</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  section: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    fontSize: 14,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  toggleNote: {
    fontSize: 12,
    marginTop: 2,
    maxWidth: 250,
  },
  planName: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 4,
  },
  planBullet: {
    fontSize: 13,
    marginVertical: 2,
  },
  note: {
    fontSize: 12,
  },
  websiteButton: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
  },
  websiteText: {
    fontSize: 16,
    fontWeight: '500',
  },
});