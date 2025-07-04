import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';

export default function ParentDashboard() {
  const [facing, setFacing] = useState<'front' | 'back'>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<any>(null);
  const router = useRouter();

  const flipCamera = () => {
    setFacing((prev) => (prev === 'back' ? 'front' : 'back'));
  };

  const takePicture = async () => {
    const camera = cameraRef.current;
    if (camera) {
      const photo = await camera.takePictureAsync();
      await MediaLibrary.saveToLibraryAsync(photo.uri);
      alert('Picture saved to gallery!');
    }
  };

  const chooseImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      await MediaLibrary.createAssetAsync(uri);
      alert('Image saved to gallery!');
    }
  };

  if (!permission) return <Text>Requesting permission...</Text>;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Camera permission is required</Text>
        <Button onPress={requestPermission} title="Grant Permission" color="#007BFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Pressable style={styles.signOffButton} onPress={() => router.replace('/login')}>
          <Text style={styles.signOffText}>Sign Off</Text>
        </Pressable>
      </View>

      <CameraView ref={cameraRef} style={styles.camera} facing={facing} />

      <Pressable style={styles.button} onPress={flipCamera}>
        <Text style={styles.buttonText}>Flip Camera</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={takePicture}>
        <Text style={styles.buttonText}>Take Picture</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={chooseImage}>
        <Text style={styles.buttonText}>Choose Image</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', paddingTop: 60 },
  topBar: { width: '100%', alignItems: 'flex-end', paddingHorizontal: 20, marginBottom: 10 },
  camera: { width: 300, height: 400, borderRadius: 16, marginBottom: 20 },
  text: { color: '#333', fontSize: 16 },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  signOffButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 8,
  },
  signOffText: { fontSize: 14, color: '#000' },
});