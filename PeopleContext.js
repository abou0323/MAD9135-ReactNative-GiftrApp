import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { randomUUID } from "expo-crypto";

const PeopleContext = createContext();

export const PeopleProvider = ({ children }) => {
  const [people, setPeople] = useState([]);

  const STORAGE_KEY = "people";

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

    // updatedPeople.sort((a, b) => {
    //   const [yearA, monthA, dayA] = a.dob.split("/").map(Number);
    //   const [yearB, monthB, dayB] = b.dob.split("/").map(Number);

    //   // Compare month first, then day
    //   if (monthA === monthB) {
    //     return dayA - dayB;
    //   }
    //   return monthA - monthB;
    // })

    
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
    <PeopleContext.Provider value={{ people, addPerson, deletePerson, addIdea, deleteIdea }}>
      {children}
    </PeopleContext.Provider>
  );
};

export default PeopleContext;