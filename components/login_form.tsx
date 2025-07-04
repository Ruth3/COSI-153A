import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password: string) => {
    // At least 8 characters, one uppercase, one lowercase, one number, one special character
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      if (!validateEmail(email)) {
        setError('Please enter a valid email address');
        setLoading(false);
        return;
      }
      if (!password) {
        setError('Password is required');
        setLoading(false);
        return;
      }
      // Skip validation if iOS autofill is used
      if (!validatePassword(password) && !password.includes('-')) {
        setError('Password must be at least 8 characters and include uppercase, lowercase, number, and special character');
        setLoading(false);
        return;
      }

      await new Promise((res) => setTimeout(res, 1000));

      await AsyncStorage.setItem('user', JSON.stringify({ email, type: 'parent' }));
      router.push('/dashboard');
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.wrapper} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Schoolhouse</Text>
      <Text style={styles.subtitle}>Connecting families and childcare professionals</Text>

      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}><Text style={styles.tabTextActive}>Login</Text></TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => router.replace('/signup')}>
            <Text style={styles.tabText}>Sign Up</Text>
        </TouchableOpacity>

      </View>

      <View style={styles.card}>
        <Text style={styles.header}>Welcome Back</Text>
        <Text style={styles.subheader}>Sign in to your account</Text>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          textContentType="emailAddress"
          autoComplete="email"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
          textContentType={Platform.OS === 'ios' ? 'newPassword' : 'password'}
          autoComplete="password"
        />

        <Text style={styles.passwordHint}>
          Must be 8+ characters with uppercase, lowercase, number, and special character.
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Sign In</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: '#111827',
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#fff',
  },
  tabText: {
    color: '#9ca3af',
  },
  tabTextActive: {
    fontWeight: '600',
    color: '#111827',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  header: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  subheader: {
    color: '#6b7280',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#111827',
    marginTop: 8,
  },
  input: {
    height: 44,
    borderColor: '#d1d5db',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#111827',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  passwordHint: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 10,
  },
});