import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace('/login');
    }, 100); // short delay to let root layout mount

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View>
      <Text>Redirecting...</Text>
    </View>
  );
}