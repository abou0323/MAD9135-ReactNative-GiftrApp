import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { randomUUID } from "expo-crypto";

const PeopleContext = createContext();

export const PeopleProvider = ({ children }) => {
  const [people, setPeople] = useState([]);
  const STORAGE_KEY = "people";

  const [imageDimensions, setImageDimensions] = useState()
  const DIMENSIONS = "imageDimensions"

  // Load people from AsyncStorage
  useEffect(() => {
    loadPeople();
    // console.log(people)
  }, []);

  const loadPeople = async () => {
    const savedPeople = await AsyncStorage.getItem(STORAGE_KEY);
    if (savedPeople) setPeople(JSON.parse(savedPeople));
  };


  const addPerson = async (name, dob) => {
    const newPerson = {
      id: randomUUID(),
      name,
      dob,
      ideas: [],
    };
    const updatedPeople = [...people, newPerson];

    setPeople(updatedPeople);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPeople));

  };


  const deletePerson = async (id) => {
    const updatedPeople = people.filter((person) => person.id !== id);
    setPeople(updatedPeople);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPeople));
  };


  const addIdea = async ({id, idea}) => {
    const person = people.find((person) => person.id === id)
    person.ideas.push(idea);

    const updatedPeople = [...people];
    setPeople(updatedPeople);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPeople));

    // 
    const imageSize = {
      "width": idea.width,
      "height": idea.height,
    }
    setImageDimensions(imageSize)
    await AsyncStorage.setItem(DIMENSIONS, JSON.stringify(imageSize));
  };

  
  const deleteIdea = async (personID, ideaID) => {
    const person = people.find((person) => person.id === personID);
    person.ideas = person.ideas.filter(
      (idea) => idea.id !== ideaID
    );
    const updatedPeople = [...people];
    setPeople(updatedPeople);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPeople));
  };


  return (
    <PeopleContext.Provider value={{ people, addPerson, deletePerson, addIdea, deleteIdea, imageDimensions }}>
      {children}
    </PeopleContext.Provider>
  );
};

export default PeopleContext;