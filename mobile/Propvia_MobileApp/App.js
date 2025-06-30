import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

import PropviaLogo from './assets/PropviaLogo';

import HomeScreen from './Screens/HomeScreen';
import AboutScreen from './Screens/AboutScreen';
import PaymentPlansScreen from './Screens/PaymentPlansScreen';
import ProfileScreen from './Screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const CustomHeader = ({ route }) => {
  const navigation = useNavigation();
  const isHome = route?.name === 'index';

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>

        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={styles.menuButton}
          accessibilityLabel="Open navigation menu"
        >
          <Text style={styles.menuButtonText}>☰</Text>
        </TouchableOpacity>

        <View style={styles.logoRow}>
  {isHome ? (
    <>
      <PropviaLogo style={styles.logoIcon} />
      <Text style={styles.logoText}>Propvia</Text>
    </>
  ) : (
    <TouchableOpacity
      onPress={() => navigation.popToTop()}
      accessibilityLabel="Go to Home"
      style={styles.logoRow}
    >
      <PropviaLogo style={styles.logoIcon} />
      <Text style={styles.logoText}>Propvia</Text>
    </TouchableOpacity>
  )}
</View>



        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          style={styles.profileButton}
          accessibilityLabel="Go to Profile"
        >
          <Ionicons name="person-circle-outline" size={28} color="#FFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

function MainStack() {
  return (
    <Stack.Navigator initialRouteName="index">
      <Stack.Screen 
        name="index" 
        component={HomeScreen}
        options={{
          header: ({ route }) => <CustomHeader route={route} />, 
        }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{
          header: ({ route }) => <CustomHeader route={route} />, 
        }}
      />
      <Stack.Screen
        name="Payment Plans"
        component={PaymentPlansScreen}
        options={{
          header: ({ route }) => <CustomHeader route={route} />, 
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          header: ({ route }) => <CustomHeader route={route} />, 
        }}
      />
    </Stack.Navigator>
  );
}


function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="Home"
        onPress={() => props.navigation.navigate('Home', { screen: 'index' })}
        icon={({ color, size }) => (
          <Ionicons name="home-outline" size={size} color={color} />
        )}
      />
      <DrawerItem
        label="About"
        onPress={() => props.navigation.navigate('Home', { screen: 'About' })}
        icon={({ color, size }) => <Ionicons name="information-circle-outline" size={size} color={color} />}
      />
      <DrawerItem
        label="Payment Plans"
        onPress={() => props.navigation.navigate('Home', { screen: 'Payment Plans' })}
        icon={({ color, size }) => <Ionicons name="card-outline" size={size} color={color} />}
      />
      <DrawerItem
        label="Profile"
        onPress={() => props.navigation.navigate('Home', { screen: 'Profile' })}
        icon={({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />}
      />
    </DrawerContentScrollView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          swipeEnabled: false,
        }}
      >
        <Drawer.Screen name="Home" component={MainStack} />
      </Drawer.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#004040',
  },
  headerContainer: {
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  logoWrapper: {
    alignItems: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoIcon: {
    height: 40,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginLeft: 8,
  },
  pageTitle: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  menuButton: {
    position: 'absolute',
    left: 16,
    top: 8,
  },
  menuButtonText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileButton: {
    position: 'absolute',
    right: 16,
    top: 8,
  },
});

