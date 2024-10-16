import React, { useContext, useState } from "react";
import { 
  StyleSheet, 
  View, 
  TextInput, 
  Button, 
  Text, 
  Pressable,
  FlatList, 
  Image,
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
  const { deleteIdea } = useContext(PeopleContext);

  const person = people.find((person) => person.id === id)

  const renderItem = ({ item }) => {
    
    return (
      <View style={styles.listItemContainer}>

        <Pressable onPress={ () => console.log("image clicked")}>
          <Image
            source={{uri: item.img}}
            style={{
              width: item.width * 0.6,
              height: item.height * 0.6,
            }}
          />
        </Pressable>
        

        <View style={styles.listTextAndButton}>
          <Text style={styles.listText}>{item.text}</Text>

          <Pressable style={styles.deleteButton}
            onPress={() => deleteIdea(id, item.id)}>
            <Text style={styles.deleteButtonText}>Delete Idea</Text>
          </Pressable>
        </View>
        
      </View>
    );
  };


  return (
    <SafeAreaProvider style={styles.container}>

      <Text style={styles.title}>Ideas for {name}</Text>

      {(person.ideas.length === 0) ? (
          <View>
            <Text style={styles.listItemContainer}>No Ideas Added Yet</Text>
          </View>
        ) : (
          <View style={styles.listContainer}>
            <FlatList
              data={person.ideas}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
            />
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

  listContainer:{
    
  },
  listItemContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#bbb",
    padding: 15,
    flexDirection: "row",
    gap: 15,
    marginVertical: 5,
    
  },

  listTextAndButton: {
    // flexDirection: "row",
    flex: 1,    //
    // backgroundColor: "blue",
    justifyContent: "space-between",
  },
  listText:{
    fontSize: 18,
    fontWeight: "bold",
  },
  deleteButton: {
    // width: "100%",
    backgroundColor: "#D21F3C",
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
    paddingHorizontal: 10,
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