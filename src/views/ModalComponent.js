import React from 'react';
import { View, Modal, TouchableOpacity, Text, Image, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const ModalComponent = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <TouchableOpacity style={styles.background} onPress={onClose}>
        <View style={styles.container}>
          <View style={styles.modal}>
            <View style={styles.title}>
              {/* <View> */}
                <Image source={require('../../assets/silence-black.png')} resizeMode="contain" style={styles.logo} />
              {/* </View> */}
              <Text style={styles.titleText}>Someone has a qrush on you</Text>
            </View>
            <View style={styles.images}>
              <Image source={require('../../assets/mintchi.jpg')} style={styles.image} />
              <Image source={require('../../assets/mintchi2.jpg')} style={styles.image} />
            </View>
            <View style={styles.buttons}>
              <TouchableOpacity style={styles.button} onPress={() => console.log("Let's meet")}>
                <Text style={styles.buttonText}>Let's meet</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
                <Text style={[styles.buttonText, styles.cancelButtonText]}>Later maybe</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: width - 40,
    height: height * 0.6,
  },
  modal: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 75,
    height: 75,
    marginBottom: 15
},
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  images: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#000',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelButtonText: {
    color: '#000',
  },
});

export default ModalComponent;

// '../../assets/mintchi.jpg'