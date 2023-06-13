import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import beach4 from '../../assets/beach4.png';

const AlertParent = () => {
  const [sensorStatus, setSensorStatus] = useState('OK');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleSensorStatusChange = (status) => {
    setSensorStatus(status);
  };

  return (
    <View style={styles.container}>
      <Image
        source={beach4}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <Animated.View style={[styles.alertContainer, { opacity: fadeAnim }]}>
        <Text style={styles.title}>Drowning Alerts</Text>
        <View style={styles.separator} />
        {sensorStatus === 'OK' ? (
          <Text style={styles.statusOK}>Everything is fine</Text>
        ) : sensorStatus === 'ALERT' ? (
          <Text style={styles.statusAlert}>Warning: Sensor Alert</Text>
        ) : (
          <Text style={styles.statusSOS}>Serious Alert: SOS Mode</Text>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  alertContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  separator: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: '100%',
    marginBottom: 10,
  },
  statusOK: {
    fontSize: 20,
    color: 'green',
  },
  statusAlert: {
    fontSize: 20,
    color: 'orange',
  },
  statusSOS: {
    fontSize: 20,
    color: 'red',
  },
});

export default AlertParent;