import { Text, View } from "react-native";
{/*
    This file is the main entry point for mobile version of the Propvia website.
    It is used to render the main page of the website and allow access to any other pages the website may have.
*/}
export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
