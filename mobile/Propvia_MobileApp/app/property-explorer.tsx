import { Text, View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function PropertyExplorerScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Property Explorer</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold'
  },
  link: {
    color: '#1976d2',
    fontSize: 16,
  },
});