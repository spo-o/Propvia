import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, Linking, ScrollView, TextInput, Alert, ActivityIndicator } from 'react-native';
import { useTheme } from '../ThemeContext';

export default function AboutScreen() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const { colors, isDark } = useTheme();

  // Add state for form fields and loading
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to send message to backend
  const handleSendMessage = async () => {
    if (!name || !email || !subject || !message) {
      Alert.alert('Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('http://192.168.0.235:5050/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
        }),
      });
      if (response.ok) {
        Alert.alert('Message sent!', 'Thank you for contacting us.');
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        Alert.alert('Error', 'Failed to send message. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'Could not connect to server.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenWebsite = () => {
    Linking.openURL('https://propvia.com/about');
  };

  return (
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
              Email: <Text style={{ color: isDark ? '#F7C948' : '#111' }}> hello@propvia.com </Text>
            </Text>
            <Text style={[styles.description, { color: colors.description }]}>
              Phone: <Text style={{ color: isDark ? '#F7C948' : '#111' }}> +1 (313) 555-0123 </Text>
            </Text>
            <Text style={[styles.description, { color: colors.description }]}>
              Address: <Text style={{ color: isDark ? '#F7C948' : '#111' }}> 440 Burroughs Street #114 Detroit, MI 48202 </Text>
            </Text>
            <Text style={[styles.subtitle, { color: colors.text }]}>Send Us a Message</Text>

            {/* Messaging Prompt */}
            <View
              style={[
                styles.messageContainer,
                {
                  backgroundColor: isDark ? '#22262b' : '#f7f7f7', // dark/light backgrounds
                  borderColor: isDark ? '#444851' : '#ccc',
                  borderWidth: 1,
                }
              ]}
            >
              <Text style={[
                styles.messageLabel,
                { color: isDark ? '#fff' : '#222' }
              ]}>Name</Text>
              <TextInput
                style={[
                  styles.messageInput,
                  {
                    backgroundColor: isDark ? '#2c2f33' : '#fff',
                    color: isDark ? '#fff' : '#222',
                    borderColor: isDark ? '#444851' : '#ccc',
                  }
                ]}
                placeholder="Your full name"
                placeholderTextColor={isDark ? '#888' : '#aaa'}
                value={name}
                onChangeText={setName}
              />
              <Text style={[
                styles.messageLabel,
                { color: isDark ? '#fff' : '#222' }
              ]}>Email</Text>
              <TextInput
                style={[
                  styles.messageInput,
                  {
                    backgroundColor: isDark ? '#2c2f33' : '#fff',
                    color: isDark ? '#fff' : '#222',
                    borderColor: isDark ? '#444851' : '#ccc',
                  }
                ]}
                placeholder="your.email@example.com"
                placeholderTextColor={isDark ? '#888' : '#aaa'}
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
              <Text style={[
                styles.messageLabel,
                { color: isDark ? '#fff' : '#222' }
              ]}>Subject</Text>
              <TextInput
                style={[
                  styles.messageInput,
                  {
                    backgroundColor: isDark ? '#2c2f33' : '#fff',
                    color: isDark ? '#fff' : '#222',
                    borderColor: isDark ? '#444851' : '#ccc',
                  }
                ]}
                placeholder="What's this about?"
                placeholderTextColor={isDark ? '#888' : '#aaa'}
                value={subject}
                onChangeText={setSubject}
              />
              <Text style={[
                styles.messageLabel,
                { color: isDark ? '#fff' : '#222' }
              ]}>Message</Text>
              <TextInput
                style={[
                  styles.messageInput,
                  styles.messageTextarea,
                  {
                    backgroundColor: isDark ? '#2c2f33' : '#fff',
                    color: isDark ? '#fff' : '#222',
                    borderColor: isDark ? '#444851' : '#ccc',
                  }
                ]}
                placeholder="Tell us about your property investment goals..."
                placeholderTextColor={isDark ? '#888' : '#aaa'}
                multiline
                numberOfLines={4}
                value={message}
                onChangeText={setMessage}
              />
              <TouchableOpacity
                style={[
                  styles.sendButton,
                  { backgroundColor: isDark ? '#F7C948' : '#004040', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }
                ]}
                onPress={handleSendMessage}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color={isDark ? '#222' : '#fff'} />
                ) : (
                  <Text style={[
                    styles.sendButtonText,
                    { color: isDark ? '#222' : '#fff' }
                  ]}>
                    Send Message <Text style={styles.sendButtonIcon}>✈️</Text>
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}
        <TouchableOpacity
          style={[styles.websiteButton, { backgroundColor: isDark ? '#F7C948' : '#004040' }]}
          onPress={handleOpenWebsite}
          accessibilityRole="button"
        >
          <Text style={[
            styles.websiteButtonText,
            { color: isDark ? '#222' : '#fff' }
          ]}>
            Visit Our Website
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#25292e',
    justifyContent: 'center',
  },
  header: {
    padding: 20,
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
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
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
    //backgroundColor: '#333842',
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
    //backgroundColor: '#2c2f33',
    //color: '#fff',
    padding: 10,
    borderRadius: 4,
    marginBottom: 15,
    borderWidth: 1,
    //borderColor: '#444851',
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
  },
  websiteButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'stretch',
  },
  websiteButtonText: {
    color: '#25292e',
    fontWeight: 'bold',
    fontSize: 16,
  },
});