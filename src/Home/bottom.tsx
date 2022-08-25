import React, { useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import BottomSheet,{BottomSheetView} from "@gorhom/bottom-sheet";

const BottomSheetScreen = (props) => {
  console.log("props",props.onChangb)
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  //const snapPoints = useMemo(() => ["25%"], []);
  const snapPoints = ["40%"]

  const[isOpen,setIsopen]=useState(true)

  // renders
  return (
    <View style={styles.container}>
      <Text>weelcome app</Text>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        // add bottom inset to elevate the sheet
        enablePanDownToClose={true}
        onClose={()=>setIsopen(props.onChangb)}
        style={styles.sheetContainer}
      >
        <BottomSheetView>
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </View>

        </BottomSheetView>
        
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  sheetContainer: {
    // add horizontal space
    marginHorizontal: 24,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default BottomSheetScreen;
 