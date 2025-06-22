import { View, StyleSheet } from 'react-native';
import LoginForm from '../components/login_form';

export default function LoginPage() {
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
