// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import PeopleScreen from './screens/PeopleScreen';
// import AddPersonScreen from './screens/AddPersonScreen';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       {/* <PeopleScreen/> */}
//       <AddPersonScreen/>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });




// // import PeopleScreen from "./screens/PeopleScreen";
// // // import RecipePage from "./pages/RecipePage";
// // // import IngredientsPage from "./pages/IngredientsPage";
// // import { createNativeStackNavigator } from "@react-navigation/native-stack";
// // import { NavigationContainer } from "@react-navigation/native";

// // const Stack = createNativeStackNavigator();

// // export default function App() {
// //   return (
// //     <NavigationContainer>
// //       <Stack.Navigator initialRouteName="PeopleScreen">
// //         <Stack.Screen name="PeopleScreen" component={PeopleScreen} />
// //         {/* <Stack.Screen name="Recipe" component={RecipePage} />
// //         <Stack.Screen name="Ingredients" component={IngredientsPage} /> */}
// //       </Stack.Navigator>
// //     </NavigationContainer>
// //   );
// // }


import { StyleSheet, Text, View } from "react-native";
import AppNavigator from "./AppNavigator";
import { PeopleProvider } from "./PeopleContext";

export default function App() {
  return (
    <View style={styles.container}>
      <PeopleProvider>
        <AppNavigator />
      </PeopleProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});