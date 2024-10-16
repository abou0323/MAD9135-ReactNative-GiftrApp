
import { 
  StyleSheet, 
  View, 
  Button, 
  Text, 
  Pressable, 
  Modal,
} from "react-native";

export default function ModalComponent({visibility, toggle, message}) {

  return (

      <Modal
        transparent={true}
        visible={visibility}
        animationType="slide"
        onRequestClose={
          //triggered by Android Back button, drag dismiss on iOS, menu button on TVOS
          toggle
        }
      >
        <View style={styles.modalBG}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{message}</Text>
            {/* <Button onPress={()=>{setIsModalVisible(!isModalVisible)}} title="Close"/> */}

            {/* <Pressable style={styles.modalButton} onPress={toggle}>
              <Text style={styles.modalButtonText}>Close</Text>
            </Pressable> */}

            <View style={styles.buttons}>
              <Pressable style={styles.modalButton} onPress={toggle}>
                <Text style={styles.modalButtonText}>Close</Text>
              </Pressable>
              {type === "requestConfirm" &&
                <Pressable style={styles.modalButton} onPress={toggle}>
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </Pressable>
              }
            </View>
          </View>

        </View>
      </Modal>
    
  );
}


const styles = StyleSheet.create({
  // container: {
  //   padding: 10,
  // },
  // title: {
  //   fontSize: 20,
  //   paddingBottom: 20,
  // },
  // inputTitleName: {
  //   fontSize: 16,
  //   paddingBottom: 5,
  // },
  // nameInput: {
  //   fontSize: 16,
  //   backgroundColor: "#fff",
  //   borderRadius: 5,
  //   marginBottom: 10,
  //   borderBottomWidth: 1,
  //   // borderBottomColor: "#000",
  //   borderColor: "blue",
  // },
  // inputTitleDOB: {
  //   fontSize: 16,
  //   paddingTop: 15,
  //   paddingBottom: 5,
  // },

  // button: {
  //   width: "95%",
  //   height: 50,
  //   marginHorizontal: 20,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   alignSelf: "center",
  //   padding: 3,
  //   borderRadius: 18,
  //   backgroundColor: "#D21F3C",
  //   margin: 5,
  // },
  // saveButton:{
  //   backgroundColor: "#0F52BA",
  // },
  // buttonText: {
  //   color: "#fff",
  //   fontSize: 18,
  // },

  // testingText: {
  //   fontSize: 18,
  // },


  // // modalModal: {
  // //   backgroundColor: "white",
  // //   opacity: 0.5,
  // // },
  // // modalView: {
  // //   backgroundColor: "white",
  // //   backgroundColor: 'rgba(0, 0, 0, 0.5)',
  // //   padding: 20,
  // //   borderRadius: 10,
  // //   justifyContent: "center",
  // //   alignItems: "center",
  // //   // backgroundColor: "red",
  // //   // flexDirection: "row",
    
  // //   // flex: 1,
  // // },

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
  }

});