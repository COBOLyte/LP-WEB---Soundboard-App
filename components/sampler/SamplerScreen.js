import React, { useState } from "react";
import { Pressable, StyleSheet, Modal, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { clearPadSample, PadSelectorById, samplerSelector } from "./SamplerSlice";
import Pad from "./Pad";

const SamplerScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const pads = useSelector(samplerSelector).pads;
  const [currentPadId, setCurrentPadId] = useState(0);
  const currentPad = useSelector((state) => PadSelectorById(state, currentPadId));
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (padId) => {
    setModalVisible(true);
    setCurrentPadId(padId);
  }

  const closeModal = () => setModalVisible(false);

  return (
    <SafeAreaView style={ styles.container }>
      { pads.map((item) => {
        return (
          <Pad
            key={ item.id }
            sampleId={ item.sampleId }
            color={ item.color }
            handleLongPress={() => openModal(item.id)}
          />
        );
      }) }

      <SafeAreaView style={ styles.centeredView }>
          <Modal
            animationType='fade'
            transparent={ true }
            visible={ modalVisible }
            onRequestClose={() => closeModal()}
          >
            <Pressable
              style={ styles.centeredView }
              onPress={(event) => {
                if (event.target == event.currentTarget)
                  setModalVisible(false);
              }}
            >
              <SafeAreaView style={ styles.centeredView }>
                <SafeAreaView style={ styles.modalView }>
                  <TouchableOpacity
                    style={ styles.modalButton }
                    onPress={() => {
                      navigation.navigate("Library", {
                        params: {
                          padId: currentPad.id,
                          sampleId: currentPad.sampleId
                        },
                        screen: "Samples"
                      });

                      closeModal();
                    }}
                  >
                    <Text style={ styles.modalButtonText }>
                      { (!currentPad.sampleId) ? "Choose" : "Change" } sample
                    </Text>
                  </TouchableOpacity>
                  {(currentPad.sampleId) ? (
                    <>
                      <TouchableOpacity
                        style={styles.modalButton}
                        onPress={() => dispatch(clearPadSample({ id: currentPad.id }))}
                      >
                        <Text style={styles.modalButtonText}>Clear Sample</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.modalButton}>
                        <Text style={styles.modalButtonText}>Crop</Text>
                      </TouchableOpacity>
                    </>
                    ) : null
                  }
                  <TouchableOpacity
                    style={ styles.modalButton }
                    onPress={() => {
                      navigation.navigate("Pad coloring", currentPad);
                      closeModal();
                    }}
                  >
                    <Text style={ styles.modalButtonText }>Color</Text>
                  </TouchableOpacity>
                  {/* <TouchableOpacity
                    style={ styles.modalButton }
                    onPress={() => {
                      dispatch(clearPads({}));

                      closeModal();
                    }}
                  >
                    <Text style={ styles.modalButtonText }>Clear all</Text>
                  </TouchableOpacity> */}
                </SafeAreaView>
              </SafeAreaView>
            </Pressable>
          </Modal>
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  modalView: {
    marginTop: -70,
    backgroundColor: "white",
    paddingHorizontal: 40,
    paddingVertical: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalButton: { marginVertical: 10 },
  modalButtonText: {
    fontSize: 15,
    textAlign: "center"
  }
});

export default SamplerScreen;
