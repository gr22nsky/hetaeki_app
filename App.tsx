import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import MainScreen from './screens/MainScreen';
import HotTopicScreen from './screens/HotTopicScreen';
import ProfileScreen from './screens/ProfileScreen';
import EmailLoginScreen from './screens/EmailLoginScreen';
import EmailSignupScreen from './screens/EmailSignupScreen';
import { getAccessToken } from './utils/storage';
import { View, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontFamily: 'base_font', fontSize: 14 },
        tabBarActiveTintColor: '#3EC6F6',
        tabBarInactiveTintColor: '#222',
      }}
    >
      <Tab.Screen 
        name="MainTab"
        component={MainScreen}
        options={{ 
          tabBarLabel: '메인',
          headerShown: false,
        }} 
      />
      <Tab.Screen 
        name="HotTopicTab" 
        component={HotTopicScreen}
        options={{ 
          tabBarLabel: '핫토픽', 
          headerShown: false, 
        }} 
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileScreen}
        options={{ 
          tabBarLabel: '프로필', 
          headerShown: false, 
        }} 
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    base_font: require('./assets/fonts/base_font.ttf'),
  });
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const token = await getAccessToken();
      setInitialRoute(token ? 'AppTabs' : 'Login');
    })();
  }, []);

  if (!fontsLoaded) return null;

  if (!initialRoute) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="EmailLogin" component={EmailLoginScreen} />
        <Stack.Screen name="EmailSignup" component={EmailSignupScreen} />
        <Stack.Screen 
          name="AppTabs"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
