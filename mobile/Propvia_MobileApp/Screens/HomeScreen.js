import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Welcome to Propvia Mobile App</Text>
      <Text style={styles.subtitle}>
        This is the home screen of the Propvia Mobile App!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#004040',
    padding: 16,
    textAlign: 'center',
  },
});