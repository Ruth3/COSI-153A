/*import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

interface Punch {
  type: 'in' | 'out';
  timestamp: string;
}

interface User {
  firstName: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [punches, setPunches] = useState<Punch[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      const stored = await AsyncStorage.getItem('user');
      if (stored) setUser(JSON.parse(stored));
    };

    const loadPunches = async () => {
      const storedPunches = await AsyncStorage.getItem('punches');
      if (storedPunches) {
        setPunches(JSON.parse(storedPunches));
      }
    };

    loadUser();
    loadPunches();
  }, []);

  const handlePunch = async () => {
    const now = new Date();
    const punch: Punch = {
      type: 'in',
      timestamp: now.toISOString(),
    };
    const updated: Punch[] = [...punches, punch];
    setPunches(updated);
    await AsyncStorage.setItem('punches', JSON.stringify(updated));
    Alert.alert('Punch Recorded', `You punched in at ${now.toLocaleTimeString()}`);
  };

  const handleTimeCard = () => {
    router.push('/timecard');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome, {user ? user.firstName : 'Loading'}!</Text>

      <TouchableOpacity style={styles.punchButton} onPress={handlePunch}>
        <Text style={styles.buttonText}>Punch</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.timeCardButton} onPress={handleTimeCard}>
        <Text style={styles.buttonText}>Time Card</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9fafb',
  },
  welcome: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 30,
  },
  punchButton: {
    backgroundColor: '#2563eb',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 20,
    width: '80%',
  },
  timeCardButton: {
    backgroundColor: '#10b981',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
*//*
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
  const [punches, setPunches] = useState<Punch[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      const stored = await AsyncStorage.getItem('user');
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed);
      }

      const storedPunches = await AsyncStorage.getItem('punches');
      if (storedPunches) {
        setPunches(JSON.parse(storedPunches));
      }
    };

    loadData();
  }, []);

  const handlePunch = async () => {
    const userEmail = user?.email || 'guest@example.com';
    const punchesRaw = await AsyncStorage.getItem('punches');
    const punches: Punch[] = punchesRaw ? JSON.parse(punchesRaw) : [];

    const lastPunch = [...punches].reverse().find((p) => p.user === userEmail);
    const nextType: 'in' | 'out' = lastPunch?.type === 'in' ? 'out' : 'in';

    const now = new Date();
    const newPunch: Punch = {
      type: nextType,
      timestamp: now.toISOString(),
      user: userEmail,
    };

    const updated = [...punches, newPunch];
    await AsyncStorage.setItem('punches', JSON.stringify(updated));
    setPunches(updated);

    Alert.alert('Punch Recorded', `You punched ${nextType} at ${now.toLocaleTimeString()}`);
    router.push('/timecard');
  };

  const handleTimeCard = () => {
    router.push('/timecard');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome, {user?.firstName || '...'}</Text>

      <TouchableOpacity style={styles.button} onPress={handlePunch}>
        <Text style={styles.buttonText}>Punch</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleTimeCard}>
        <Text style={styles.buttonText}>Time Card</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff', // Simple white
  },
  welcome: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 30,
    color: '#000', // Black text
  },
  button: {
    backgroundColor: '#000', // Black buttons
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 6,
    marginVertical: 10,
    width: '70%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff', // White text
    fontWeight: '600',
    fontSize: 16,
  },
});*/
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
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      const stored = await AsyncStorage.getItem('user');
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed);
      }
    };

    loadUser();
  }, []);

  const handlePunch = async () => {
    if (!user?.email) {
      Alert.alert("Error", "No user email found.");
      return;
    }

    const punchesRaw = await AsyncStorage.getItem('punches');
    const punches: Punch[] = punchesRaw ? JSON.parse(punchesRaw) : [];

    const lastPunch = [...punches].reverse().find(p => p.user === user.email);
    const nextType: 'in' | 'out' = lastPunch?.type === 'in' ? 'out' : 'in';

    const newPunch: Punch = {
      type: nextType,
      timestamp: new Date().toISOString(),
      user: user.email,
    };

    const updated = [...punches, newPunch];
    await AsyncStorage.setItem('punches', JSON.stringify(updated));

    Alert.alert('Punch Recorded', `You punched ${nextType}.`);
    router.push('/timecard');
  };

  const goToTimeCard = () => {
    router.push('/timecard');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome, {user?.firstName || '...'}</Text>

      <TouchableOpacity style={styles.button} onPress={handlePunch}>
        <Text style={styles.buttonText}>Punch</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={goToTimeCard}>
        <Text style={styles.buttonText}>Time Card</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  welcome: { fontSize: 22, fontWeight: '600', marginBottom: 30 },
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
