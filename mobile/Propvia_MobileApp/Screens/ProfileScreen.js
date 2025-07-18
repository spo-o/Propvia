<<<<<<< HEAD
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Page</Text>
      <Text style={styles.description}>This is the Profile page of the app.</Text>
=======
import { View, Text, StyleSheet, Button } from 'react-native';
import { useTheme } from '../ThemeContext';

export default function ProfileScreen() {
  const { isDark, colors, toggleTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Profile Page</Text>
      <Text style={[styles.description, { color: colors.description }]}>
        This is the Profile page of the app.
      </Text>
      <Button
        title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        onPress={toggleTheme}
      />
>>>>>>> Mobile-Team-Workspace
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    backgroundColor: '#25292e',
=======
>>>>>>> Mobile-Team-Workspace
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
<<<<<<< HEAD
    color: '#fff',
=======
>>>>>>> Mobile-Team-Workspace
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
<<<<<<< HEAD
    color: '#ccc',
    textAlign: 'center',
=======
    textAlign: 'center',
    marginBottom: 20,
>>>>>>> Mobile-Team-Workspace
  },
});