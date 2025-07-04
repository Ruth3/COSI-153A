/*import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function ParentSignupForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    childName: '',
    childAge: '',
    childGrade: '',
    emergencyContact: '',
    allergies: '',
    specialNeeds: '',
  });

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    console.log('Submitted:', form);
    router.push('/dashboard');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Create Account</Text>
      <Text style={styles.subheader}>Registering as Parent/Guardian</Text>

      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
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

      <Text style={styles.section}>Child Information</Text>

      <TextInput
        style={styles.input}
        placeholder="Child's Full Name"
        value={form.childName}
        onChangeText={(text) => handleChange('childName', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Emergency Contact"
        value={form.emergencyContact}
        onChangeText={(text) => handleChange('emergencyContact', text)}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Create Account</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f9fafb',
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  subheader: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  backButton: {
    marginBottom: 16,
  },
  backText: {
    color: '#111827',
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  halfInput: {
    width: '48%',
  },
  section: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 8,
  },
  submitButton: {
    backgroundColor: '#111827',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 40,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});*/

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

export default function ParentSignupForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    childName: '',
    childAge: '',
    childGrade: '',
    emergencyContact: '',
    allergies: '',
    specialNeeds: '',
  });

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      await AsyncStorage.setItem(
        'user',
        JSON.stringify({
          firstName: form.firstName,
          email: form.email,
          role: 'parent',
        })
      );
      router.push('/parent_dashboard');
    } catch (err) {
      console.error('Signup failed:', err);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Create Account</Text>
      <Text style={styles.subheader}>Registering as Parent/Guardian</Text>

      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
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

      <Text style={styles.section}>Child Information</Text>

      <TextInput
        style={styles.input}
        placeholder="Child's Full Name"
        value={form.childName}
        onChangeText={(text) => handleChange('childName', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Emergency Contact"
        value={form.emergencyContact}
        onChangeText={(text) => handleChange('emergencyContact', text)}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Create Account</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f9fafb',
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  subheader: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  backButton: {
    marginBottom: 16,
  },
  backText: {
    color: '#111827',
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  halfInput: {
    width: '48%',
  },
  section: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 8,
  },
  submitButton: {
    backgroundColor: '#111827',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 40,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});