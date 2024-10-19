
import { 
  StyleSheet, 
  View, 
  Button, 
  Text, 
  Pressable, 
  Modal,
  Image,
} from "react-native";
import React, { useContext } from "react";
import PeopleContext from "../PeopleContext";

// 
import { Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;

export default function ModalComponent({visibility, toggle, message, type, func}) {

  const { imageDimensions } = useContext(PeopleContext);
  // console.log(imageDimensions)

  if (type === "enlargeImage") {
    return (
      <Modal
      transparent={true}
      visible={visibility}
      animationType="slide"
      onRequestClose={toggle}   //triggered by Android Back button, drag dismiss on iOS, menu button on TVOS
    >
      <View style={styles.modalBG}>
        <View style={styles.modalContent}>
          {/* <Text style={styles.modalText}>{message}</Text> */}
          <View style={styles.imageContainer}>
            <Image
              source={{uri: message}}
              style={{
                // width: imageDimensions.width * 1.25,
                width: imageDimensions ? imageDimensions.width * 1.25 : screenWidth / 2 * 1.25,
                // height: imageDimensions.height * 1.25,
                height: imageDimensions ? imageDimensions.height * 1.25 : (screenWidth / 2 * 1.25) * (3 / 2),
              }}
            />
          </View>
          <Pressable style={styles.modalButton} onPress={func}>
            <Text style={styles.modalButtonText}>Close Preview</Text>
          </Pressable>

        </View>

      </View>
    </Modal>
    )
  }

  return (

      <Modal
        transparent={true}
        visible={visibility}
        animationType="slide"
        onRequestClose={toggle}   //triggered by Android Back button, drag dismiss on iOS, menu button on TVOS
      >
        <View style={styles.modalBG}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{message}</Text>

            {type === "missingField" && (
              <Pressable style={styles.modalButton} onPress={toggle}>
                <Text style={styles.modalButtonText}>Close</Text>
              </Pressable>
            )}


            {type === "confirmRequest" && (
              <View style={styles.buttons}>
                <Pressable style={styles.modalButton} onPress={toggle}>
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </Pressable>
                <Pressable style={styles.modalButton} onPress={func}>
                  <Text style={styles.modalButtonText}>Delete</Text>
                </Pressable>
              </View>
            )}

          </View>

        </View>
      </Modal>
    
  );
}


const styles = StyleSheet.create({
  modalBG: {
    backgroundColor: '#808080aa', 
    // opacity: 50,
    flex:1,    
    justifyContent:'center'
  }, 
  modalContent: {
    backgroundColor:"white", 
    paddingHorizontal: 50, 
    paddingVertical: 20,
    borderRadius: 9, 
    alignSelf:'center', 
    justifyContent:'center',
    gap: 20,
    width: "80%",
  },
  modalText:{
    // marginBottom: 20,
    textAlign: "center",
  },

  modalButton: {
    alignSelf: "center",
    backgroundColor: "#D21F3C",
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 9,
  }, 
  modalButtonText: {
    color: "white",
  },
  buttons: {
    flexDirection: "row",
    // backgroundColor: "yellow"
    gap: 20,
    justifyContent: "center"
  }, 

  imageContainer: {
    alignSelf: "center"
  }

});