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
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import ModalComponent from "../components/Modal";


export default function IdeaScreen({route}) {

  const navigation = useNavigation();

  const item = route.params
  const {name, id} = route.params
  const { people } = useContext(PeopleContext);
  const { deleteIdea } = useContext(PeopleContext);

  const [selectedImage, setSelectedImage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [requestConfirmDelete, setRequestConfirmDelete] = useState(false)
  const [personID, setPersonID] = useState("")
  const [ideaID, setIdeaID] = useState("")

  const person = people.find((person) => person.id === id)

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleImageClick = (img) => {
    setSelectedImage(img)
    setIsModalVisible(true)
  }

  const handleDeleteIdea = (person, idea) => {
    setIsModalVisible(true)
    setRequestConfirmDelete(true)
    setPersonID(person)
    setIdeaID(idea)
  }


  const renderItem = ({ item }) => {
    
    return (
      <View style={styles.listItemContainer}>

        <Pressable onPress={() => {handleImageClick(item.img)}}>
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
            onPress={() => handleDeleteIdea(id, item.id)}>
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


        {isModalVisible && selectedImage && (
          <ModalComponent 
            message={selectedImage}
            visibility={isModalVisible}
            toggle={toggleModal}
            type="enlargeImage"
            func={() => setSelectedImage("")}
          />
        )}

        {isModalVisible && requestConfirmDelete && (
          <ModalComponent 
            message="Are you sure you want to delete this idea?"
            visibility={isModalVisible}
            toggle={() => {toggleModal; setRequestConfirmDelete(false)}}
            type="confirmRequest"
            func={() => {deleteIdea(personID, ideaID); setRequestConfirmDelete(false)}}
          />
        )}


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
    paddingBottom: 40,
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
    flex: 1,    //
    justifyContent: "space-between",
  },
  listText:{
    fontSize: 18,
    fontWeight: "bold",
  },
  deleteButton: {
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