import { View, Text, StyleSheet, Button, Linking } from 'react-native';
import { useTheme } from '../ThemeContext';

export default function SettingsScreen() {
  const { colors } = useTheme();

  const handleOpenWebsite = () => {
    Linking.openURL('https://propvia.com/');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
        <Text style={[styles.description, { color: colors.description }]}>
          This is the Settings page of the app.
        </Text>
        <Button title="Visit Propvia Website" onPress={handleOpenWebsite} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
});