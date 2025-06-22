import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

interface Punch {
  type: 'in' | 'out';
  timestamp: string;
  user: string;
}

interface Entry {
  date: string;
  timeIn: string;
  timeOut: string;
  duration: number;
}

export default function TimeCardScreen() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [currentUser, setCurrentUser] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (!userData) return;
      const user = JSON.parse(userData);
      const userEmail = user.email || '';
      setCurrentUser(user.firstName || userEmail);

      const data = await AsyncStorage.getItem('punches');
      if (!data) return;

      let punches: Punch[] = JSON.parse(data);
      punches = punches.filter(p => p.user === userEmail);

      // Sort by timestamp ascending
      punches.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

      const entryList: Entry[] = [];
      let lastIn: Punch | null = null;

      punches.forEach(p => {
        if (p.type === 'in') {
          lastIn = p;
        } else if (p.type === 'out' && lastIn) {
          const inDate = new Date(lastIn.timestamp);
          const outDate = new Date(p.timestamp);

          const duration = (outDate.getTime() - inDate.getTime()) / (1000 * 60 * 60);

          if (!isNaN(duration) && duration > 0) {
            entryList.push({
              date: inDate.toLocaleDateString(),
              timeIn: inDate.toLocaleTimeString(),
              timeOut: outDate.toLocaleTimeString(),
              duration,
            });
          }

          lastIn = null;
        }
      });

      setEntries(entryList);
    };

    fetchData();
  }, []);

  const totalHours = entries.reduce((sum, e) => sum + e.duration, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Time Card</Text>

      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>← Back to Dashboard</Text>
      </TouchableOpacity>

      {entries.length > 0 ? (
        <>
          <View style={styles.headerRow}>
            <Text style={styles.cellHeader}>Date</Text>
            <Text style={styles.cellHeader}>In</Text>
            <Text style={styles.cellHeader}>Out</Text>
            <Text style={styles.cellHeader}>Hours</Text>
          </View>
          <FlatList
            data={entries}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <Text style={styles.cell}>{item.date}</Text>
                <Text style={styles.cell}>{item.timeIn}</Text>
                <Text style={styles.cell}>{item.timeOut}</Text>
                <Text style={styles.cell}>{item.duration.toFixed(2)}</Text>
              </View>
            )}
          />
          <Text style={styles.total}>Total Hours: {totalHours.toFixed(2)}</Text>
        </>
      ) : (
        <Text style={styles.noData}>No punch records yet.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  backText: {
    color: '#007AFF',
    fontSize: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    borderBottomWidth: 1,
    paddingBottom: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  cellHeader: {
    flex: 1,
    fontWeight: '600',
    fontSize: 16,
  },
  cell: {
    flex: 1,
    fontSize: 14,
  },
  total: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'right',
  },
  noData: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
});