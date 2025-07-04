import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SignUpPage() {
  const router = useRouter();

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Schoolhouse</Text>
      <Text style={styles.subtitle}>Connecting families and childcare professionals</Text>

      <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.tab} onPress={() => router.replace('/login')}>
          <Text style={styles.tabText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={styles.tabTextActive}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.header}>Create Account</Text>
        <Text style={styles.subheader}>Join our childcare community</Text>

        <Text style={styles.label}>I am a…</Text>
        <Text style={styles.subheader}>Choose your account type to get started</Text>

        <TouchableOpacity
          style={styles.optionBox}
          onPress={() => router.push('/signup/parent')}
        >
          <Text style={styles.optionTitle}>👩‍👧 Parent/Guardian</Text>
          <Text>Register your child for childcare services</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionBox}
          onPress={() => router.push('/signup/staff')}
        >
          <Text style={styles.optionTitle}>👩‍🏫 Staff Member</Text>
          <Text>Join our childcare team</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    marginBottom: 12,
  },
  label: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 6,
  },
  optionBox: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 6,
    marginTop: 10,
    backgroundColor: '#fff',
  },
  optionTitle: {
    fontWeight: '600',
    marginBottom: 4,
  },
});