import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../ThemeContext';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { isDark, colors, toggleTheme } = useTheme();

  return (
    <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <Text style={[styles.title, { color: colors.text }]}>Welcome back, User</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Settings')}
          style={styles.iconButton}
        >
          <Feather name="settings" size={22} color={colors.text} />
        </TouchableOpacity>
      </View>
      <Text style={[styles.subtitle, { color: colors.description }]}>
        Here's what's happening with your properties
      </Text>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={[styles.statTitle, { color: colors.text }]}>Analyzed Properties</Text>
          <Text style={[styles.statValue, { color: colors.text }]}>0</Text>
          <Text style={[styles.statNote, { color: colors.description }]}>No properties analyzed yet</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statTitle, { color: colors.text }]}>Saved Scenarios</Text>
          <Text style={[styles.statValue, { color: colors.text }]}>0</Text>
          <Text style={[styles.statNote, { color: colors.description }]}>No scenarios saved yet</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statTitle, { color: colors.text }]}>Team Members</Text>
          <Text style={[styles.statValue, { color: colors.text }]}>1</Text>
          <Text style={[styles.statNote, { color: colors.description }]}>Just you for now</Text>
        </View>
      </View>

      <View style={styles.analysisCard}>
        <View style={[
          styles.iconCircle,
          {
            backgroundColor: isDark
              ? 'rgba(247, 201, 72, 0.1)'
              : 'rgba(0, 64, 64, 0.1)',
          }
        ]}>
          <Feather name="file-text" size={36} color={isDark ? '#F7C948' : '#004040'} />
        </View>
        <Text style={[styles.analysisTitle, { color: colors.text }]}>No Analysis Yet</Text>
        <Text style={[styles.analysisNote, { color: colors.description }]}>
          Start by analyzing properties to track your portfolio and generate insights.
        </Text>
        <Pressable
          onPress={() => navigation.navigate('PropertyExplorer')}
          style={({ pressed }) => [
            styles.actionButton,
            {
              backgroundColor: isDark
                ? (pressed ? '#e6b738' : '#F7C948')
                : (pressed ? '#003030' : '#004040'),
            },
          ]}
        >
          <Text style={[styles.actionText, { color: isDark ? '#000' : '#fff' }]}>
            Analyze Your First Property
          </Text>
        </Pressable>
      </View>

      <Pressable
        onPress={toggleTheme}
        style={[styles.themeToggle, { borderColor: colors.border }]}
      >
        <Text style={[styles.themeToggleText, { color: colors.text }]}>
          Switch to {isDark ? 'Light' : 'Dark'} Mode
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  iconButton: {
    padding: 6,
    borderRadius: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: 'transparent',
    alignItems: 'center',
    minHeight: 90,
  },
  statTitle: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 4,
    textAlign: 'center',
    maxWidth: 90,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
  },
  statNote: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 2,
  },
  analysisCard: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 20,
    borderRadius: 16,
    marginBottom: 32,
  },
  iconCircle: {
    borderRadius: 50,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  analysisTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  analysisNote: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
  actionButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
  },
  actionText: {
    fontWeight: '600',
    fontSize: 14,
  },
  themeToggle: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    alignSelf: 'center',
  },
  themeToggleText: {
    fontWeight: '500',
    fontSize: 14,
  },
});