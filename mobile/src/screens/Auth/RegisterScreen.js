import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { registerUser } from '../../store/slices/authSlice';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleRegister = () => {
    if (!name || !email || !phone || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    dispatch(registerUser({ name, email, phone, password }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.logo}>FastHub</Text>
        <Text style={styles.title}>Create Account</Text>
        {error && <Text style={styles.errorText}>{error}</Text>}

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput style={styles.input} placeholder="John Doe" value={name} onChangeText={setName} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} placeholder="john@example.com" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput style={styles.input} placeholder="+44 7XXX XXX XXX" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput style={styles.input} placeholder="Min 8 characters" value={password} onChangeText={setPassword} secureTextEntry />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput style={styles.input} placeholder="Re-enter password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
        </View>

        <TouchableOpacity style={styles.registerButton} onPress={handleRegister} disabled={isLoading}>
          {isLoading ? <ActivityIndicator color={COLORS.white} /> : <Text style={styles.registerButtonText}>Create Account</Text>}
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginLink} onPress={() => navigation.goBack()}>
          <Text style={styles.loginText}>Already have an account? <Text style={styles.loginLinkText}>Log In</Text></Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  content: { paddingHorizontal: SIZES.padding * 1.5, paddingTop: 30 },
  logo: { ...FONTS.h1, color: COLORS.primary, fontSize: 36, textAlign: 'center', marginBottom: 10 },
  title: { ...FONTS.h2, color: COLORS.black, marginBottom: 20, textAlign: 'center' },
  errorText: { color: COLORS.error, marginBottom: 12, textAlign: 'center' },
  inputContainer: { marginBottom: 14 },
  label: { ...FONTS.body2, color: COLORS.darkGray, marginBottom: 6 },
  input: { borderWidth: 1, borderColor: COLORS.mediumGray, borderRadius: SIZES.radius, paddingHorizontal: 16, paddingVertical: 14, fontSize: 16 },
  registerButton: { backgroundColor: COLORS.primary, borderRadius: SIZES.radius, paddingVertical: 16, alignItems: 'center', marginTop: 10 },
  registerButtonText: { color: COLORS.white, ...FONTS.h4 },
  loginLink: { alignItems: 'center', marginTop: 20, marginBottom: 30 },
  loginText: { ...FONTS.body2, color: COLORS.gray },
  loginLinkText: { color: COLORS.primary, fontWeight: '600' },
});
