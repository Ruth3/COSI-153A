import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

interface Punch {
  type: 'in' | 'out';
  timestamp: string;
  user: string;
}

interface User {
  firstName: string;
  email: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [lastPunchIn, setLastPunchIn] = useState<string | null>(null);
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

  const handlePunch = async () => {
    if (!user?.email) {
      Alert.alert("Error", "No user email found.");
      return;
    }

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
      if (!unmatchedIn || hasMatchingOut) {
        Alert.alert("Cannot Punch Out", "You must punch in first.");
        return;
      }
    }

    const newPunch: Punch = {
      type: nextType,
      timestamp: new Date().toISOString(),
      user: user.email,
    };

    const updatedPunches = [...punches, newPunch];
    await AsyncStorage.setItem('punches', JSON.stringify(updatedPunches));

    if (nextType === 'in') {
      setLastPunchIn(new Date(newPunch.timestamp).toLocaleTimeString());
    } else {
      setLastPunchIn(null);
    }

    Alert.alert(`Punched ${nextType.toUpperCase()}`, `Time: ${new Date().toLocaleTimeString()}`);
  };

  const goToTimeCard = () => {
    router.push('/timecard');
  };

  const clearPunches = async () => {
    await AsyncStorage.removeItem('punches');
    setLastPunchIn(null);
    Alert.alert('Cleared', 'All punch records have been deleted.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome, {user?.firstName || '...'}</Text>

      {lastPunchIn && (
        <Text style={styles.punchInfo}>Punched in at: {lastPunchIn}</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handlePunch}>
        <Text style={styles.buttonText}>Punch</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={goToTimeCard}>
        <Text style={styles.buttonText}>Time Card</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#ef4444' }]} onPress={clearPunches}>
        <Text style={styles.buttonText}>Clear Punches</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  welcome: { fontSize: 22, fontWeight: '600', marginBottom: 10 },
  punchInfo: { fontSize: 16, color: '#555', marginBottom: 20 },
  button: {
    backgroundColor: '#000',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 6,
    marginVertical: 10,
    width: '70%',
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});
