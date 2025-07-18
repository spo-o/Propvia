import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../ThemeContext';

export default function ResourcesScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Resources</Text>
      <Text style={[styles.description, { color: colors.description }]}>
        This is the Resources page of the app.
        It contains the blog, FAQs, and guides of the website.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
});