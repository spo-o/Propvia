import { View, Text, StyleSheet } from 'react-native';

export default function PaymentPlansScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Plans</Text>
      <Text style={styles.text}>Details about your subscription options will appear here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  text: {
    color: '#ccc',
    fontSize: 16,
    textAlign: 'center',
  },
});