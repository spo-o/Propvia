import { View, Text, StyleSheet, Button, Linking } from 'react-native';

export default function AboutScreen() {
  const handleOpenWebsite = () => {
    Linking.openURL('https://propvia.com/');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>About Propvia</Text>
        <Text style={styles.description}>This is the About page of the app.</Text>
        <Button title="Visit Propvia Website" onPress={handleOpenWebsite} />
      </View>
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
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 20,
  },
});