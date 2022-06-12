import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { persistStore } from 'redux-persist'
import { PersistGate } from "redux-persist/integration/react";
import Ionicons from '@expo/vector-icons/Ionicons';

import Store from "./Store";
import SamplerScreen from "./components/sampler/SamplerScreen"
import LibraryScreen from "./components/library/LibraryScreen"
import RecordScreen from "./components/RecordScreen";
import DownloadScreen from "./components/DownloadScreen";
import ColorPadScreen from "./components/ColorPadScreen";
import CropSampleScreen from "./components/CropSampleScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Persistor = persistStore(Store);

const LibraryTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Samples')
            iconName = focused
              ? 'list'
              : 'list-outline';
          else if (route.name === 'Record')
            iconName = focused
            ? 'mic'
            : 'mic-outline';
            else if (route.name === 'Download')
            iconName = focused
            ? 'download'
            : 'download-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Samples" component={ LibraryScreen } options={{ headerShown: false }} />
      <Tab.Screen name="Record" component={ RecordScreen } options={{ headerShown: false }} />
      <Tab.Screen name="Download" component={ DownloadScreen } options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={ Store }>
      <StatusBar hidden />
      <PersistGate persistor={ Persistor }>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator>
            <Stack.Screen
              name="Sounboard App"
              component={ SamplerScreen }
              options={{ headerShown: false }}
            />
              <Stack.Screen
                name="Library"
                component={ LibraryTabs }
              />
              <Stack.Screen
                name="Crop Sample"
                component={ CropSampleScreen }
                options={{ headerShown: true }}
              />
              <Stack.Screen
                name="Color Pad"
                component={ ColorPadScreen }
                options={{ headerShown: true }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
