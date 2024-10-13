import React, { useContext, useState } from "react";
import { 
  StyleSheet, 
  View, 
  TextInput, 
  Button, 
  Text, 
  Pressable, 
  Platform, 
  KeyboardAvoidingView, 
  Keyboard,
} from "react-native";
import PeopleContext from "../PeopleContext";
import { useNavigation } from "@react-navigation/native";


export default function AddIdeaScreen({route}) {

  const navigation = useNavigation();
  const [idea, setIdea] = useState("");

  const {name, id} = route.params
  const { people } = useContext(PeopleContext);
  const { addIdea } = useContext(PeopleContext);

  const saveIdea = () => {
    // !! notify if field is empty !!!!
    if(idea === ""){
      console.log("Idea text field is empty")
      return
    }
    addIdea({
      id: id,
      idea: idea,
    })
    navigation.goBack();
    
  };


  return (

    <KeyboardAvoidingView
      behaviour={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Pressable onPress={Keyboard.dismiss}>

        <Text style={styles.title}>Add an idea for {name}</Text>
        <Text style={styles.inputTitle}>Idea:</Text>
        <TextInput style={styles.inputText} placeholder="" value={idea} onChangeText={setIdea} />
        

        <Button title="Save" onPress={saveIdea} />
        {/* <Button title="Save" onPress={console.log("add idea button pressed")} /> */}
        <Button title="Cancel" onPress={() => navigation.goBack()} />

      </Pressable>

    </KeyboardAvoidingView>
    
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
  inputTitle: {
    fontSize: 16,
    paddingBottom: 5,
  },
  inputText: {
    fontSize: 16,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 10,
    borderBottomWidth: 1,
    // borderBottomColor: "#000",
    borderColor: "blue",
  },
});