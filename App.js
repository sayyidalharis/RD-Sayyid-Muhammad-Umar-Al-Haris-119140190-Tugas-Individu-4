import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Clipboard from 'expo-clipboard';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet scanned')
  const [copiedText, setCopiedText] = useState('');

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })()
  }

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data);
    console.log('Type: ' + type + '\nData: ' + data)
    console.log(copiedText)
  };

  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>)
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
      </View>)
  }
  
  const copyToClipboard = (msg) => {
    Clipboard.setString(msg);
  };

  const fetchCopiedText = async () => {
    const text2 = await Clipboard.getStringAsync();
    setCopiedText(text2);
  };

  // Return the View
  return (
    <View style={styles.container}>
      <View style={styles.box}>
          <Text style={styles.textnormal}>{"APP SCAN BARCODE & COPY LINK"}</Text>
          <Text style={styles.textnormal}> {"SAYYID HARIS | 119140190 "} </Text>
          <Text style={styles.textnormal}>{"PAM RD"}</Text>
      </View>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }} />
      </View>
      <Text style={styles.maintext}>{text}</Text>
      {scanned && <TouchableOpacity 
          style={styles.buttonBold}
          onPress={() => setScanned(false)}
      >
          <Text style={styles.textButton}>Scan again?!</Text>
      </TouchableOpacity>}
      {/* {scanned && <Button title={'Scan again?'} style={'marginBottom : 200'} onPress={() => setScanned(false)} color='#ffb6c1' />} */}
      <TouchableOpacity 
          style={styles.button}
          onPress={() => Clipboard.setString(text)}
      >
          <Text style={styles.textButton}>Click here to copy the link to clipboard!</Text>
      </TouchableOpacity>
      {/* <Button title="Click here to copy to link Clipboard" onPress={() => Clipboard.setString(text)} /> */}
      <Text style={styles.maintext}>{copiedText}</Text><TouchableOpacity 
          style={styles.button}
          onPress={fetchCopiedText}
      >
          <Text style={styles.textButton}>View copied text!</Text>
      </TouchableOpacity>
      {/* <Button title="View copied text" onPress={fetchCopiedText} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  box:{
      backgroundColor: '#ffb6c1',
      borderRadius: 20,
      padding: 10,
      width: '80%',
      shadowColor: '#000',
      elevation: 5,
      marginTop: 10,
      marginBottom: '5%',
      textAlign: 'center',
      alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#ff7a8e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maintext: {
    fontSize: 16,
    color: "white",
    fontWeight: 'bold',
    marginTop: '7%',
    marginBottom: '1%',
    paddingHorizontal: '10%'
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: '#ffb6c1'
  },
  button:{
      flex: 0,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ff526c',
      borderRadius: 20,
      marginTop: 14,
  },
  buttonBold:{
      flex: 0,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#cc001f',
      borderRadius: 20,
      marginTop: 14,
  },
  textButton:{
      fontWeight: 'bold',
      fontSize: 14,
      padding: 10,
      color: '#fff',
  },
  textnormal:{
    color: 'purple',
    fontWeight: 'bold',
    fontSize: 18,
    padding: 2
  }
});