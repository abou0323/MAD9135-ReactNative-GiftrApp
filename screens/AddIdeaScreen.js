import React, { useContext, useState, useEffect } from "react";
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
  useWindowDimensions, 
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import PeopleContext from "../PeopleContext";
import { useNavigation } from "@react-navigation/native";
import { Camera, CameraView } from "expo-camera";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { randomUUID } from "expo-crypto";
import ModalComponent from "../components/Modal";


const aspectRatio = 2/3
const screenWidth = Dimensions.get("window").width;
const screenWidthPercentage = 0.5
const screenHeight = Dimensions.get("window").height;
const cameraWidth = Math.round(screenWidth*screenWidthPercentage)
const cameraHeight = Math.round(cameraWidth/aspectRatio)

// console.log("Width: ", cameraWidth)
// console.log("Height: ", cameraHeight)

export default function AddIdeaScreen({route}) {

  const navigation = useNavigation();
  const [idea, setIdea] = useState("");

  const {name, id} = route.params
  const { people } = useContext(PeopleContext);
  const { addIdea } = useContext(PeopleContext);



  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };


  // Request camera permission
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // Request camera permission
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // If permission is not granted
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return (
      <View style={styles.messageContainer}>
        <Text style={styles.message}>No access to camera, please grant permission.</Text>
      </View>
    );
  }

  // Function to take a picture
  const takePicture = async () => {
    if (cameraRef) {
      cameraRef
        .getAvailablePictureSizesAsync()
        .then((sizes) => {
          console.log("Sizes: ",sizes);
        });
        const options = {
          quality: 0.8,
          // pictureSize: sizes ? sizes[1] : '1200x1800',
          pictureSize: '1200x1800',
          // imageType: 'jpg',
          // skipProcessing: false,
        };
      const data = await cameraRef.takePictureAsync(options);
      // console.log("Data:", data)
      setPhoto(data.uri); // Set the photo URI to display
    }
  };

  

  const saveIdea = () => {

    if(idea === "" || photo === null){
      setIsModalVisible(true)
      return
    }

    addIdea({
      id: id,
      idea: {
        id: randomUUID(),
        text: idea,
        img: photo,
        width: cameraWidth,
        height: cameraHeight,
      }
    })
    // console.log(people)
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
        
        <Text style={styles.inputTitle}>Picture of Idea:</Text>


      <View>
        {/* Camera view if no photo is taken yet */}
        {!photo ? (
          <CameraView
            style={styles.cameraViewContainer}
            ref={(ref) => setCameraRef(ref)}
          >
            <View style={styles.captureContainer}>
              <TouchableOpacity
                style={styles.captureButton}
                onPress={takePicture}
              >
                {/* <Text style={styles.captureText}> Take Picture </Text> */}
                <MaterialCommunityIcons name="camera" size={42} color="white" />
              </TouchableOpacity>
            </View>
          </CameraView>
        ) : (
          // If a photo is taken, display the preview, with option to retake photo
          <View style={styles.cameraViewContainer}>
            <View style={styles.captureContainer}>
              <Image source={{ uri: photo }} style={styles.imagePreview} />
              <TouchableOpacity
                style={styles.reCaptureButton}
                onPress={() => setPhoto(null)}
              >
                <MaterialCommunityIcons  name="camera-retake" size={42} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
  



        {/* <Button title="Save" onPress={saveIdea} /> */}
        <Pressable style={[styles.button, styles.saveButton]} onPress={saveIdea}>
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>
      
        {/* <Button title="Save" onPress={console.log("add idea button pressed")} /> */}
        {/* <Button title="Cancel" onPress={() => navigation.goBack()} /> */}
        <Pressable style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>

      </Pressable>


      {isModalVisible && !photo && (
        <ModalComponent 
          message="Please take a photo."
          visibility={isModalVisible}
          toggle={toggleModal}
          type="missingField"
          func={null}
        />
      )}

      {isModalVisible && !idea && (
        <ModalComponent 
          message="Please fill in the idea."
          visibility={isModalVisible}
          toggle={toggleModal}
          type="missingField"
          func={null}
        />
      )}


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
    marginBottom: 20,
    borderBottomWidth: 1,
    // borderBottomColor: "#000",
    borderColor: "#3f51b5",
  },



  cameraViewContainer:{
    // flex: 1,
    // width: "80%",
    width: cameraWidth,
    height: cameraHeight,
    alignSelf: "center",
    // justifyContent: "center",
    // alignContent: "center",
    // alignItems: "center",
  },
  captureContainer: {
    flex: 1,
    backgroundColor: "transparent",
    // flexDirection: "row",
    // justifyContent: "space-between",
    // margin: 20,
    justifyContent: "flex-end",
    // width: "50%",
  },
  captureButton: {
    alignSelf: "center",
    // justifyContent: "flex-end",
    alignContent: "flex-end",
    // alignItems: "end",
    // justifyContent: "flex-end",
    // backgroundColor: "white",
    // borderRadius: 10,
    // padding: 15,
    marginBottom: 20,
  },
  // previewContainer: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  imagePreview: {
    width: "100%",
    height: "100%",
    // resizeMode: "contain",
  },


  reCaptureButton: {
    position: 'absolute',
    alignSelf: "center",
    bottom: 20,
  },


  messageContainer: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
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
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },

});