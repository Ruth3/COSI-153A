import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import LoginForm from '../components/login_form';

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const checkRole = async () => {
      await AsyncStorage.removeItem('user'); // Clear saved login to prevent auto-redirect

      const stored = await AsyncStorage.getItem('user');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.role === 'parent') {
          router.replace('/parent_dashboard');
        } else {
          router.replace('/dashboard');
        }
      }
    };
    checkRole();
  }, []);

  return (
    <View style={styles.container}>
      <LoginForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f9fafb',
  },
});