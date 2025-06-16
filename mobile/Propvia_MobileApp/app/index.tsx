import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
/*
    This file is the main entry point for mobile version of the Propvia website.
    It is used to render the main page of the website and allow access to any other pages the website may have.
*/
export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#fff',
      }}
    >
      <Text style={{ color: '#000' }}>This is the home screen</Text>
      <Link href="/about" style={{ marginTop: 16, color: "#1976d2" }}>
  Go to About Page
</Link>
    </View>
  );
}
