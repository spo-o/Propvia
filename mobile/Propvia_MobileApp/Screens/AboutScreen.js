<<<<<<< HEAD
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, Linking, ScrollView, TextInput } from 'react-native';
import { useTheme } from '../ThemeContext';

export default function AboutScreen() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false); // New state for Contact Us
  const { colors } = useTheme();

=======
import { View, Text, StyleSheet, Button, Linking } from 'react-native';

export default function AboutScreen() {
>>>>>>> main
  const handleOpenWebsite = () => {
    Linking.openURL('https://propvia.com/');
  };

  return (
<<<<<<< HEAD
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.header}>
        {/* About Section */}
        <TouchableOpacity
          style={styles.dropdownRow}
          onPress={() => setAboutOpen(open => !open)}
        >
          <Text style={[styles.arrow, { color: colors.text }]}>{aboutOpen ? '▼' : '▶'}</Text>
          <Text style={[styles.title, { color: colors.text }]}>About</Text>
        </TouchableOpacity>
        {aboutOpen && (
          <View>
            <Text style={[styles.description, { color: colors.description }]}>
              Propvia is revolutionizing commercial property analysis through 
              advanced AI and data analytics, helping businesses make smarter 
              real estate decisions.
            </Text>
            <Text style={[styles.subtitle, { color: colors.text }]}>Our Mission</Text>
            <Text style={[styles.description, { color: colors.description }]}>
              To empower businesses with the most advanced tools for commercial 
              property analysis, enabling them to make informed decisions that 
              drive success and growth.
            </Text>
            <Text style={[styles.subtitle, { color: colors.text }]}>Our Vision</Text>
            <Text style={[styles.description, { color: colors.description }]}>
              To become the global standard for commercial property analysis, 
              helping businesses worldwide unlock the full potential of their 
              real estate investments.
            </Text>
            <Text style={[styles.subtitle, { color: colors.text }]}>Our Values</Text>
            <Text style={[styles.subsubtitle, { color: colors.text }]}>Innovation</Text>
            <Text style={[styles.description, { color: colors.description }]}>
              Continuously pushing boundaries with cutting-edge technology 
              and AI solutions.
            </Text>
            <Text style={[styles.subsubtitle, { color: colors.text }]}>Transparency</Text>
            <Text style={[styles.description, { color: colors.description }]}>
              Providing clear, actionable insights backed by reliable data.
            </Text>
            <Text style={[styles.subsubtitle, { color: colors.text }]}>Excellence</Text>
            <Text style={[styles.description, { color: colors.description }]}>
              Delivering the highest quality analysis and customer service.
            </Text>
            <Text style={[styles.subsubtitle, { color: colors.text }]}>Integrity</Text>
            <Text style={[styles.description, { color: colors.description }]}>
              Building trust through honest, ethical business practices.
            </Text>
          </View>
        )}

        {/* Contact Us Section */}
        <TouchableOpacity
          style={styles.dropdownRow}
          onPress={() => setContactOpen(open => !open)}
        >
          <Text style={[styles.arrow, { color: colors.text }]}>{contactOpen ? '▼' : '▶'}</Text>
          <Text style={[styles.title, { color: colors.text }]}>Contact Us</Text>
        </TouchableOpacity>
        {contactOpen && (
          <View>
            <Text style={[styles.description, { color: colors.description }]}>
              Email: <Text style={{ color: colors.primary || '#F7C948' }}>hello@propvia.com</Text>
            </Text>
            <Text style={[styles.description, { color: colors.description }]}>
              Phone: <Text style={{ color: colors.primary || '#F7C948' }}>+1 (313) 555-0123</Text>
            </Text>
            <Text style={[styles.description, { color: colors.description }]}>
              Address: 440 Burroughs Street #114 Detroit, MI 48202
            </Text>
            <Text style={[styles.subtitle, { color: colors.text }]}>Send Us a Message</Text>

            {/* Messaging Prompt */}
            <View style={styles.messageContainer}>
              <Text style={styles.messageLabel}>Name</Text>
              <TextInput
                style={styles.messageInput}
                placeholder="Your full name"
                placeholderTextColor="#888"
              />
              <Text style={styles.messageLabel}>Email</Text>
              <TextInput
                style={styles.messageInput}
                placeholder="your.email@example.com"
                placeholderTextColor="#888"
                keyboardType="email-address"
              />
              <Text style={styles.messageLabel}>Subject</Text>
              <TextInput
                style={styles.messageInput}
                placeholder="What's this about?"
                placeholderTextColor="#888"
              />
              <Text style={styles.messageLabel}>Message</Text>
              <TextInput
                style={[styles.messageInput, styles.messageTextarea]}
                placeholder="Tell us about your property investment goals..."
                placeholderTextColor="#888"
                multiline
                numberOfLines={4}
              />
              <TouchableOpacity style={styles.sendButton}>
                <Text style={styles.sendButtonText}>
                  Send Message <Text style={styles.sendButtonIcon}>✈️</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <Button title="Visit Our Website" onPress={handleOpenWebsite} />
      </ScrollView>
=======
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>About Propvia</Text>
        <Text style={styles.description}>This is the About page of the app.</Text>
        <Button title="Visit Propvia Website" onPress={handleOpenWebsite} />
      </View>
>>>>>>> main
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
  },
  header: {
    padding: 20,
<<<<<<< HEAD
    alignItems: 'flex-start',
  },
  dropdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  arrow: {
    fontSize: 36,
    color: '#fff',
    marginRight: 8,
  },
  title: {
    fontSize: 36,
    color: '#fff',
    fontWeight: '500'
  },
  subtitle: {
=======
    alignItems: 'center',
  },
  title: {
>>>>>>> main
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
<<<<<<< HEAD
  subsubtitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '500',
  },
  description: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'left',
    marginBottom: 20,
    marginTop: 10,
  },
  messageContainer: {
    marginTop: 10,
    backgroundColor: '#333842',
    padding: 15,
    borderRadius: 8,
    width: '100%',
  },
  messageLabel: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  messageInput: {
    backgroundColor: '#2c2f33',
    color: '#fff',
    padding: 10,
    borderRadius: 4,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#444851',
  },
  messageTextarea: {
    minHeight: 100,
    maxHeight: 200,
  },
  sendButton: {
    backgroundColor: '#F7C948',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#25292e',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sendButtonIcon: {
    fontSize: 16,
    marginLeft: 5,
=======
  description: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 20,
>>>>>>> main
  },
});