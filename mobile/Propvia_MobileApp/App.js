import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

import PropviaLogo from './assets/PropviaLogo';
import { ThemeProvider, useTheme } from './ThemeContext';

import HomeScreen from './Screens/HomeScreen';
import AboutScreen from './Screens/AboutScreen';
import ProfileScreen from './Screens/ProfileScreen';
import ResourcesScreen from './Screens/ResourcesScreen';
import PropertyExplorerScreen from './Screens/PropertyExplorerScreen';
import SettingsScreen from './Screens/SettingsScreen';
import MarketIntelScreen from './Screens/MarketIntelScreen';
import BlogScreen from './Screens/BlogScreen';
import GuidesScreen from './Screens/GuidesScreen';
import FAQScreen from './Screens/FAQScreen';
import AskAiLandingScreen from './Screens/AskAiLandingScreen';
import AskAiSearchQueryScreen from './Screens/AskAiSearchQueryScreen';

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
        options={{ header: ({ route }) => <CustomHeader route={route} /> }}
      />
      <Stack.Screen
        name="Information"
        component={AboutScreen}
        options={{ header: ({ route }) => <CustomHeader route={route} /> }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ header: ({ route }) => <CustomHeader route={route} /> }}
      />
      <Stack.Screen
        name="PropertyExplorer"
        component={PropertyExplorerScreen}
        options={{ header: ({ route }) => <CustomHeader route={route} /> }}
      />
      <Stack.Screen
        name="Resources"
        component={ResourcesScreen}
        options={{ header: ({ route }) => <CustomHeader route={route} /> }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ header: ({ route }) => <CustomHeader route={route} /> }}
      />
      <Stack.Screen
        name="MarketIntel"
        component={MarketIntelScreen}
        options={{ header: ({ route }) => <CustomHeader route={route} /> }}
      />
      <Stack.Screen
        name="BlogScreen"
        component={BlogScreen}
        options={{ header: ({ route }) => <CustomHeader route={route} /> }}
      />
      <Stack.Screen
        name="GuidesScreen"
        component={GuidesScreen}
        options={{ header: ({ route }) => <CustomHeader route={route} /> }}
      />
      <Stack.Screen
        name="FAQScreen"
        component={FAQScreen}
        options={{ header: ({ route }) => <CustomHeader route={route} /> }}
      />
      <Stack.Screen
        name="AskAiLanding"
        component={AskAiLandingScreen}
        options={{ header: ({ route }) => <CustomHeader route={route} /> }}
      />
      <Stack.Screen
  name="AskAiSearchQuery"
  component={AskAiSearchQueryScreen}
  options={{ header: ({ route }) => <CustomHeader route={route} /> }}
/>
    </Stack.Navigator>
  );
}

function CustomDrawerContent(props) {
  const { colors } = useTheme();
  const navigation = props.navigation;

  return (
    <DrawerContentScrollView
      {...props}
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={{ flex: 1, paddingTop: 70 }}
    >
      <TouchableOpacity
        style={styles.askAIButton}
        onPress={() => navigation.navigate('Home', { screen: 'AskAiLanding' })}
      >
        <Ionicons name="sparkles-outline" size={18} color="#5b6670" style={{ marginLeft: 10 }} />
        <Text style={styles.askAIButtonText}>Ask AI</Text>
      </TouchableOpacity>

      <DrawerItem
        label="Home"
        labelStyle={{ color: colors.text }}
        onPress={() => props.navigation.navigate('Home', { screen: 'index' })}
        icon={({ size }) => (
          <Ionicons name="home-outline" size={size} color={colors.text} />
        )}
      />
      <DrawerItem
        label="Information"
        labelStyle={{ color: colors.text }}
        onPress={() => props.navigation.navigate('Home', { screen: 'Information' })}
        icon={({ size }) => (
          <Ionicons name="information-circle-outline" size={size} color={colors.text} />
        )}
      />
      <DrawerItem
        label="Property Explorer"
        labelStyle={{ color: colors.text }}
        onPress={() => props.navigation.navigate('Home', { screen: 'PropertyExplorer' })}
        icon={({ size }) => (
          <PropviaLogo style={{ width: size, height: size }} variant="drawer" color={colors.text} />
        )}
      />
      <DrawerItem
        label="Profile"
        labelStyle={{ color: colors.text }}
        onPress={() => props.navigation.navigate('Home', { screen: 'Profile' })}
        icon={({ size }) => (
          <Ionicons name="person-outline" size={size} color={colors.text} />
        )}
      />
      <DrawerItem
        label="Settings"
        labelStyle={{ color: colors.text }}
        onPress={() => props.navigation.navigate('Home', { screen: 'Settings' })}
        icon={({ size }) => (
          <Ionicons name="settings-outline" size={size} color={colors.text} />
        )}
      />
      <DrawerItem
        label="Market Intel"
        labelStyle={{ color: colors.text }}
        onPress={() => props.navigation.navigate('Home', { screen: 'MarketIntel' })}
        icon={({ size }) => (
          <Ionicons name="globe-outline" size={size} color={colors.text} />
        )}
      />
    </DrawerContentScrollView>
  );
}

export default function App() {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
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
  askAIButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#c6cfd1',
    borderRadius: 10,
    marginHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  askAIButtonText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#5b6670',
  },
});