/*import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { format, addDays, startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';

interface Punch {
  type: 'in' | 'out';
  timestamp: string;
  user: string;
  location?: string;
}

interface Entry {
  date: string;
  timeIn: string;
  timeOut: string | null;
  duration: number | null;
  rawDate: Date;
  locationIn?: string;
  locationOut?: string;
}

export default function TimeCardScreen() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [currentUser, setCurrentUser] = useState<string>('');
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const router = useRouter();

  const weekRange = `${format(currentWeekStart, 'MMM d')} – ${format(addDays(currentWeekStart, 6), 'MMM d')}`;

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
      punches.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

      const entryList: Entry[] = [];
      let lastIn: Punch | undefined;

      punches.forEach(p => {
        if (p.type === 'in') {
          lastIn = p;
        } else if (p.type === 'out' && lastIn) {
          const inDate = new Date(lastIn.timestamp);
          const outDate = new Date(p.timestamp);
          const duration = (outDate.getTime() - inDate.getTime()) / (1000 * 60 * 60);
          if (!isNaN(duration) && duration > 0) {
            entryList.push({
              date: format(inDate, 'EEEE'),
              timeIn: format(inDate, 'p'),
              timeOut: format(outDate, 'p'),
              duration,
              rawDate: inDate,
              locationIn: lastIn.location,
              locationOut: p.location,
            });
          }
          lastIn = undefined;
        }
      });

      if (lastIn) {
        const inDate = new Date(lastIn.timestamp);
        entryList.push({
          date: format(inDate, 'EEEE'),
          timeIn: format(inDate, 'p'),
          timeOut: null,
          duration: null,
          rawDate: inDate,
          locationIn: lastIn.location,
        });
      }

      setEntries(entryList);
    };

    fetchData();
  }, []);

  const filteredEntries = entries.filter(e =>
    isWithinInterval(e.rawDate, {
      start: startOfWeek(currentWeekStart, { weekStartsOn: 1 }),
      end: endOfWeek(currentWeekStart, { weekStartsOn: 1 }),
    })
  );

  const totalHours = filteredEntries.reduce((sum, e) => sum + (e.duration ?? 0), 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Time Card</Text>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>← Back to Dashboard</Text>
      </TouchableOpacity>

      <View style={styles.weekRow}>
        <TouchableOpacity onPress={() => setCurrentWeekStart(addDays(currentWeekStart, -7))}>
          <Text style={styles.navArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.weekLabel}>{weekRange}</Text>
        <TouchableOpacity onPress={() => setCurrentWeekStart(addDays(currentWeekStart, 7))}>
          <Text style={styles.navArrow}>›</Text>
        </TouchableOpacity>
      </View>

      {filteredEntries.length > 0 ? (
        <>
          <View style={styles.headerRow}>
            <Text style={styles.cellHeader}>Day</Text>
            <Text style={styles.cellHeader}>In</Text>
            <Text style={styles.cellHeader}>Out</Text>
            <Text style={styles.cellHeader}>Time</Text>
          </View>
          <FlatList
            data={filteredEntries}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <Text style={styles.cell}>{item.date}</Text>
                <Text style={styles.cell}>
                  {item.timeIn}
                  {'\n'}
                  {item.locationIn ?? ''}
                </Text>
                <Text style={styles.cell}>
                  {item.timeOut ?? '--'}
                  {'\n'}
                  {item.locationOut ?? ''}
                </Text>
                <Text style={styles.cell}>
                  {item.duration !== null ? `${item.duration.toFixed(1)}h` : '--'}
                </Text>
              </View>
            )}
          />
          <Text style={styles.total}>Total Hours: {totalHours.toFixed(2)}</Text>
        </>
      ) : (
        <Text style={styles.noData}>No entries this week.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 10, textAlign: 'center' },
  backButton: { alignSelf: 'flex-start', marginBottom: 10 },
  backText: { color: '#007AFF', fontSize: 16 },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  navArrow: { fontSize: 24, color: '#007AFF', marginHorizontal: 16 },
  weekLabel: { fontSize: 16, fontWeight: '600' },
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
  cellHeader: { flex: 1, fontWeight: '600', fontSize: 16 },
  cell: { flex: 1, fontSize: 14 },
  total: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'right',
  },
  noData: { fontSize: 16, textAlign: 'center', marginTop: 20, color: '#888' },
});*/
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addDays, endOfWeek, format, isWithinInterval, startOfWeek } from 'date-fns';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Punch {
  type: 'in' | 'out';
  timestamp: string;
  user: string;
  location?: string;
}

interface Entry {
  date: string;
  timeIn: string;
  timeOut: string | null;
  duration: number | null;
  rawDate: Date;
  location?: string;
}

export default function TimeCardScreen() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [currentUser, setCurrentUser] = useState<string>('');
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const router = useRouter();

  const weekRange = `${format(currentWeekStart, 'MMM d')} – ${format(addDays(currentWeekStart, 6), 'MMM d')}`;

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
      punches.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

      const entryList: Entry[] = [];
      let lastIn: Punch | undefined;

      punches.forEach(p => {
        if (p.type === 'in') {
          lastIn = p;
        } else if (p.type === 'out' && lastIn) {
          const inDate = new Date(lastIn.timestamp);
          const outDate = new Date(p.timestamp);
          const duration = (outDate.getTime() - inDate.getTime()) / (1000 * 60 * 60);
          if (!isNaN(duration) && duration > 0) {
            entryList.push({
              date: format(inDate, 'EEEE'),
              timeIn: format(inDate, 'p'),
              timeOut: format(outDate, 'p'),
              duration,
              rawDate: inDate,
              location: lastIn.location,
            });
          }
          lastIn = undefined;
        }
      });

      if (lastIn) {
        const inDate = new Date(lastIn.timestamp);
        entryList.push({
          date: format(inDate, 'EEEE'),
          timeIn: format(inDate, 'p'),
          timeOut: null,
          duration: null,
          rawDate: inDate,
          location: lastIn.location,
        });
      }

      setEntries(entryList);
    };

    fetchData();
  }, []);

  const filteredEntries = entries.filter(e =>
    isWithinInterval(e.rawDate, {
      start: startOfWeek(currentWeekStart, { weekStartsOn: 1 }),
      end: endOfWeek(currentWeekStart, { weekStartsOn: 1 }),
    })
  );

  const totalHours = filteredEntries.reduce((sum, e) => sum + (e.duration ?? 0), 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Time Card</Text>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>← Back to Dashboard</Text>
      </TouchableOpacity>

      <View style={styles.weekRow}>
        <TouchableOpacity onPress={() => setCurrentWeekStart(addDays(currentWeekStart, -7))}>
          <Text style={styles.navArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.weekLabel}>{weekRange}</Text>
        <TouchableOpacity onPress={() => setCurrentWeekStart(addDays(currentWeekStart, 7))}>
          <Text style={styles.navArrow}>›</Text>
        </TouchableOpacity>
      </View>

      {filteredEntries.length > 0 ? (
        <>
          <View style={styles.headerRow}>
            <Text style={styles.cellHeader}>Day</Text>
            <Text style={styles.cellHeader}>In</Text>
            <Text style={styles.cellHeader}>Out</Text>
            <Text style={styles.cellHeader}>Time</Text>
          </View>
          <FlatList
            data={filteredEntries}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <Text style={styles.cell}>{item.date}</Text>
                <Text style={styles.cell}>
                  {item.timeIn}
                  {'\n'}
                  {item.location ? item.location : ''}
                </Text>
                <Text style={styles.cell}>{item.timeOut ?? '--'}</Text>
                <Text style={styles.cell}>
                  {item.duration !== null ? `${item.duration.toFixed(1)}h` : '--'}
                </Text>
              </View>
            )}
          />
          <Text style={styles.total}>Total Hours: {totalHours.toFixed(2)}</Text>
        </>
      ) : (
        <Text style={styles.noData}>No entries this week.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 10, textAlign: 'center' },
  backButton: { alignSelf: 'flex-start', marginBottom: 10 },
  backText: { color: '#007AFF', fontSize: 16 },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  navArrow: { fontSize: 24, color: '#007AFF', marginHorizontal: 16 },
  weekLabel: { fontSize: 16, fontWeight: '600' },
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
  cellHeader: { flex: 1, fontWeight: '600', fontSize: 16 },
  cell: { flex: 1, fontSize: 14 },
  total: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'right',
  },
  noData: { fontSize: 16, textAlign: 'center', marginTop: 20, color: '#888' },
});
