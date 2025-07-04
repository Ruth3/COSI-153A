import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function StaffSignupForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    role: '',
    experience: '',
    certifications: '',
  });

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify({
        type: 'staff',
        firstName: form.firstName,
        email: form.email,
        role: form.role,
      }));
      router.push('/dashboard');
    } catch (err) {
      console.error('Failed to store user info:', err);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <Text style={styles.header}>Create Account</Text>
      <Text style={styles.subheader}>Registering as Staff Member</Text>

      <TouchableOpacity onPress={() => router.replace('/signup')} style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="First Name"
          value={form.firstName}
          onChangeText={(text) => handleChange('firstName', text)}
        />
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Last Name"
          value={form.lastName}
          onChangeText={(text) => handleChange('lastName', text)}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={form.email}
        onChangeText={(text) => handleChange('email', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Create a secure password"
        secureTextEntry
        textContentType={Platform.OS === 'ios' ? 'newPassword' : 'password'}
        value={form.password}
        onChangeText={(text) => handleChange('password', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={form.phone}
        onChangeText={(text) => handleChange('phone', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Select your role"
        value={form.role}
        onChangeText={(text) => handleChange('role', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Select experience level"
        keyboardType="numeric"
        value={form.experience}
        onChangeText={(text) => handleChange('experience', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="CPR, First Aid, Early Childhood Education, etc."
        value={form.certifications}
        onChangeText={(text) => handleChange('certifications', text)}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Create Account</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: '700', textAlign: 'center', marginBottom: 4 },
  subtitle: { fontSize: 14, textAlign: 'center', color: '#6b7280', marginBottom: 20 },
  tabRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 16 },
  tab: { fontSize: 16, paddingHorizontal: 20, paddingVertical: 8, borderRadius: 6 },
  activeTab: { backgroundColor: '#f3f4f6', fontWeight: '600' },
  inactiveTab: { color: '#6b7280' },
  header: { fontSize: 18, fontWeight: '700', marginBottom: 4 },
  subheader: { fontSize: 14, color: '#6b7280', marginBottom: 12 },
  backButton: { marginBottom: 12 },
  backText: { color: '#111827', fontWeight: '600', fontSize: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  halfInput: { width: '48%' },
  submitButton: {
    backgroundColor: '#111827',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 40,
  },
  submitButtonText: { color: '#fff', fontWeight: '600' },
});
