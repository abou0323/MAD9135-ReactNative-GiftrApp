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
  ScrollView,
} from "react-native";
import PeopleContext from "../PeopleContext";
import { useNavigation } from "@react-navigation/native";
import DatePicker from "react-native-modern-datepicker";

export default function AddPersonScreen() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const { addPerson } = useContext(PeopleContext);
  const navigation = useNavigation();

  const savePerson = () => {
    if (name && dob) {
      addPerson(name, dob);
      navigation.goBack();
    }
    // !! notify if field is empty !!!!
    
  };
  return (

    <KeyboardAvoidingView
      behaviour={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView>
        <Pressable onPress={Keyboard.dismiss}>


          <Text style={styles.title}>Add a person</Text>
          <Text style={styles.inputTitleName}>Name:</Text>
          <TextInput style={styles.nameInput} placeholder="" value={name} onChangeText={setName} />
          
          <Text style={styles.inputTitleDOB}>Date of Birth:</Text>
          <DatePicker
            onSelectedChange={date => setDob(date)}
            mode="calendar"
          />

          {/* <Button title="Save" onPress={savePerson} /> */}
          {/* <Button title="Cancel" onPress={() => navigation.goBack()} /> */}

          <Pressable style={[styles.button, styles.saveButton]} onPress={savePerson}>
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText} >Cancel</Text>
          </Pressable>


        </Pressable>
      </ScrollView>

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
  inputTitleName: {
    fontSize: 16,
    paddingBottom: 5,
  },
  nameInput: {
    fontSize: 16,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 10,
    borderBottomWidth: 1,
    // borderBottomColor: "#000",
    borderColor: "blue",
  },
  inputTitleDOB: {
    fontSize: 16,
    paddingTop: 15,
    paddingBottom: 5,
  },

  button: {
    width: "95%",
    height: 50,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    padding: 3,
    borderRadius: 18,
    backgroundColor: "#D21F3C",
    margin: 5,
  },
  saveButton:{
    backgroundColor: "#0F52BA",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },

  testingText: {
    fontSize: 18,
  }
});