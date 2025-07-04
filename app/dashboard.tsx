import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Punch {
  type: 'in' | 'out';
  timestamp: string;
  user: string;
  location?: string;
  note?: string;
}

interface User {
  firstName: string;
  email: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [lastPunchIn, setLastPunchIn] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [pendingPunch, setPendingPunch] = useState<'in' | 'out' | null>(null);
  const [locationInfo, setLocationInfo] = useState<{ location: string; address: string }>({ location: '', address: '' });
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      const stored = await AsyncStorage.getItem('user');
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed);
      }
    };

    const checkLastPunch = async () => {
      if (!user?.email) return;
      const punchesRaw = await AsyncStorage.getItem('punches');
      const punches: Punch[] = punchesRaw ? JSON.parse(punchesRaw) : [];
      const userPunches = punches.filter(p => p.user === user.email);
      let lastIn: Punch | null = null;
      for (let i = userPunches.length - 1; i >= 0; i--) {
        if (userPunches[i].type === 'out') break;
        if (userPunches[i].type === 'in') {
          lastIn = userPunches[i];
          break;
        }
      }
      setLastPunchIn(lastIn ? new Date(lastIn.timestamp).toLocaleTimeString() : null);
    };

    loadUser().then(checkLastPunch);
  }, [user]);

  const startPunch = async () => {
    if (!user?.email) return;

    const punchesRaw = await AsyncStorage.getItem('punches');
    const punches: Punch[] = punchesRaw ? JSON.parse(punchesRaw) : [];
    const userPunches = punches.filter(p => p.user === user.email);
    const lastPunch = userPunches[userPunches.length - 1];
    const nextType: 'in' | 'out' = lastPunch?.type === 'in' ? 'out' : 'in';

    if (nextType === 'out') {
      const unmatchedIn = [...userPunches].reverse().find(p => p.type === 'in');
      const hasMatchingOut = userPunches.some(
        (p, idx) => p.type === 'out' && idx > userPunches.lastIndexOf(unmatchedIn!)
      );
      if (!unmatchedIn || hasMatchingOut) return;
    }

    const { status } = await Location.requestForegroundPermissionsAsync();
    let locationString = '', address = '';
    if (status === 'granted') {
      const loc = await Location.getCurrentPositionAsync({});
      locationString = `Lat: ${loc.coords.latitude.toFixed(4)}, Lon: ${loc.coords.longitude.toFixed(4)}`;
      try {
        const geo = await Location.reverseGeocodeAsync(loc.coords);
        if (geo.length > 0) {
          const place = geo[0];
          address = `${place.name || ''} ${place.street || ''}, ${place.city || ''}, ${place.region || ''} ${place.postalCode || ''}`.trim();
        }
      } catch {
        address = 'Unable to retrieve address';
      }
    } else {
      locationString = 'Location permission denied';
      address = 'Address not available';
    }

    setLocationInfo({ location: locationString, address });
    setPendingPunch(nextType);
    setModalVisible(true);
  };

  const confirmPunch = async () => {
    if (!user?.email || !pendingPunch) return;

    const punchesRaw = await AsyncStorage.getItem('punches');
    const punches: Punch[] = punchesRaw ? JSON.parse(punchesRaw) : [];

    const newPunch: Punch = {
      type: pendingPunch,
      timestamp: new Date().toISOString(),
      user: user.email,
      location: `${locationInfo.location} | ${locationInfo.address}`,
      note: note.trim() || undefined,
    };

    const updatedPunches = [...punches, newPunch];
    await AsyncStorage.setItem('punches', JSON.stringify(updatedPunches));

    if (pendingPunch === 'in') setLastPunchIn(new Date().toLocaleTimeString());
    else setLastPunchIn(null);

    setNote('');
    setPendingPunch(null);
    setModalVisible(false);
  };

  const goToTimeCard = () => router.push('/timecard');
  const clearPunches = async () => {
    await AsyncStorage.removeItem('punches');
    setLastPunchIn(null);
  };

  const signOut = async () => {
    await AsyncStorage.removeItem('user');
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome, {user?.firstName || '...'}</Text>
      {lastPunchIn && <Text style={styles.punchInfo}>Punched in at: {lastPunchIn}</Text>}
      <TouchableOpacity style={styles.button} onPress={startPunch}><Text style={styles.buttonText}>Punch</Text></TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={goToTimeCard}><Text style={styles.buttonText}>Time Card</Text></TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: '#ef4444' }]} onPress={clearPunches}><Text style={styles.buttonText}>Clear Punches</Text></TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: '#888' }]} onPress={signOut}><Text style={styles.buttonText}>Sign Out</Text></TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>You punched {pendingPunch?.toUpperCase()}</Text>
            <Text style={styles.modalText}>Location: {locationInfo.location}</Text>
            <Text style={styles.modalText}>Address: {locationInfo.address}</Text>
            <Text style={styles.modalText}>Add a note:</Text>
            <TextInput style={styles.input} placeholder="Optional note..." value={note} onChangeText={setNote} multiline />
            <TouchableOpacity style={styles.button} onPress={confirmPunch}><Text style={styles.buttonText}>Confirm</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  welcome: { fontSize: 22, fontWeight: '600', marginBottom: 10 },
  punchInfo: { fontSize: 16, color: '#555', marginBottom: 20 },
  button: {
    backgroundColor: '#000', paddingVertical: 14, paddingHorizontal: 30,
    borderRadius: 6, marginVertical: 10, width: '70%', alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  modalBackground: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 20 },
  modalBox: { backgroundColor: '#fff', borderRadius: 10, padding: 20, elevation: 5 },
  modalTitle: { fontSize: 18, fontWeight: '600', marginBottom: 10 },
  modalText: { fontSize: 14, marginBottom: 6 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 6,
    padding: 10, height: 80, textAlignVertical: 'top', marginBottom: 10,
  },
});