import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import Alert from "@mui/material/Alert";
// import mapp from "../assets/mapp.png";
function AlertV() {
  return (
    <View>
      <Alert severity="error">SOS!!🆘</Alert>
      {/* <Image src={mapp} alt="mapp" />; */}

      <TouchableOpacity style={styles.button}>
        {/* <Text style={styles.buttonText}>End of event📳</Text> */}
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    margin: 5,
    padding: 5,
    backgroundColor: "gray",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    margin: "auto",
  },
});

export default AlertV;
