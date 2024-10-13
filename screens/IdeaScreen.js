import React, { useContext, useState } from "react";
import { 
  StyleSheet, 
  View, 
  TextInput, 
  Button, 
  Text, 
  Pressable, 
} from "react-native";
import PeopleContext from "../PeopleContext";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  GestureHandlerRootView,
} from "react-native-gesture-handler";


export default function IdeaScreen({route}) {

  const navigation = useNavigation();

  const item = route.params
  const {name, id} = route.params
  const { people } = useContext(PeopleContext);

  const person = people.find((person) => person.id === id)


  return (
    <SafeAreaProvider style={styles.container}>

      <Text style={styles.title}>Ideas for {name}</Text>

      {(person.ideas.length === 0) ? (
          <View>
            <Text style={styles.list}>No Ideas Added Yet</Text>
          </View>
        ) : (
          <View>
            <Text style={styles.list}>there are ideas</Text>
          </View>
        )
      }

      <Pressable style={styles.fabContainer}
          onPress={() => navigation.navigate("AddIdea", item)}>
          <MaterialCommunityIcons name="plus-thick" size={24} color="black" />
      </Pressable>

    </SafeAreaProvider>
    
  );


}


const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    paddingBottom: 20,
  },
  list: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#bbb",
    padding: 5,
  },
  fabContainer: {
    /* position the content inside the FAB */
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15, 
    /* for the FAB itself */
    borderRadius: 50,
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#C0AFE2',
  },

});