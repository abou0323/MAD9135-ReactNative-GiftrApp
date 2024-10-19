import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { 
  StyleSheet, 
  Button, 
  FlatList, 
  View, 
  Text, 
  SafeAreaView, 
  Pressable, 
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import PeopleContext from "../PeopleContext";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function PeopleScreen() {

  const navigation = useNavigation();
  const { people } = useContext(PeopleContext);
  const { deletePerson } = useContext(PeopleContext);


  const renderRightActions = (id) => (
    <TouchableOpacity
      onPress={() => deletePerson(id)}
      style={styles.deleteButton}
    >
      <MaterialCommunityIcons name="trash-can-outline" size={32} color="white"/>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    let dateFormat = item.dob.split("/").join("-");
    let dateObj = new Date(dateFormat);
    let dateObjTimeZone = dateObj.setTime( dateObj.getTime() + dateObj.getTimezoneOffset()*60*1000 )
      let options = {
        month: 'long',
        day: 'numeric',
      };
      let formattedDOB = new Intl.DateTimeFormat('en-CA', options).format(dateObjTimeZone);
    
    return (
      <Swipeable renderRightActions={() => renderRightActions(item.id)}>
        <View style={styles.itemContainer}>
          <View style={styles.itemPerson}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDOB}>{formattedDOB}</Text>
          </View>
          <MaterialIcons name="lightbulb" size={32} color="black" 
            onPress={() => navigation.navigate("Idea", item)}/>
        </View>
      </Swipeable>
    );
  };

  // sort array
  people.sort((a, b) => {
    const [yearA, monthA, dayA] = a.dob.split("/").map(Number);
    const [yearB, monthB, dayB] = b.dob.split("/").map(Number);
    // Compare month first, then day
    if (monthA === monthB) {
      return dayA - dayB;
    }
    return monthA - monthB;
    })

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.container}>
        <SafeAreaView>
          {(people.length === 0) ? (
              <View>
                <Text style={styles.itemContainer}>No People Saved</Text>
              </View>
            ) : (
              <FlatList
                data={people}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
              />
            )
          }
        </SafeAreaView>
      </GestureHandlerRootView>

      <Pressable style={styles.fabContainer}
            onPress={() => navigation.navigate("AddPerson")}>
            <MaterialCommunityIcons name="plus-thick" size={24} color="black" />
      </Pressable>
    </SafeAreaProvider>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  itemContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#eee",
    
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#B20000",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "100%",
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
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
  }
});