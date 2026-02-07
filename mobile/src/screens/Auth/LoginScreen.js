import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { loginUser, clearError } from '../../store/slices/authSlice';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    dispatch(loginUser({ email, password }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.logo}>FastHub</Text>
          <Text style={styles.subtitle}>Food delivered to your door</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.title}>Welcome Back</Text>
          {error && <Text style={styles.errorText}>{error}</Text>}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} placeholder="Enter your email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput style={styles.input} placeholder="Enter your password" value={password} onChangeText={setPassword} secureTextEntry />
          </View>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={isLoading}>
            {isLoading ? <ActivityIndicator color={COLORS.white} /> : <Text style={styles.loginButtonText}>Log In</Text>}
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.socialButton, styles.appleButton]}>
            <Text style={[styles.socialButtonText, { color: COLORS.white }]}>Continue with Apple</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.registerLink} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerText}>Don't have an account? <Text style={styles.registerLinkText}>Sign Up</Text></Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  content: { flex: 1, paddingHorizontal: SIZES.padding * 1.5 },
  header: { alignItems: 'center', marginTop: 40, marginBottom: 30 },
  logo: { ...FONTS.h1, color: COLORS.primary, fontSize: 36 },
  subtitle: { ...FONTS.body2, color: COLORS.gray, marginTop: 8 },
  form: { flex: 1 },
  title: { ...FONTS.h2, color: COLORS.black, marginBottom: 20 },
  errorText: { color: COLORS.error, marginBottom: 12, textAlign: 'center' },
  inputContainer: { marginBottom: 16 },
  label: { ...FONTS.body2, color: COLORS.darkGray, marginBottom: 6 },
  input: { borderWidth: 1, borderColor: COLORS.mediumGray, borderRadius: SIZES.radius, paddingHorizontal: 16, paddingVertical: 14, fontSize: 16 },
  forgotPassword: { alignSelf: 'flex-end', marginBottom: 20 },
  forgotPasswordText: { color: COLORS.primary, ...FONTS.body2 },
  loginButton: { backgroundColor: COLORS.primary, borderRadius: SIZES.radius, paddingVertical: 16, alignItems: 'center' },
  loginButtonText: { color: COLORS.white, ...FONTS.h4 },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 24 },
  dividerLine: { flex: 1, height: 1, backgroundColor: COLORS.mediumGray },
  dividerText: { marginHorizontal: 16, color: COLORS.gray, ...FONTS.body3 },
  socialButton: { borderWidth: 1, borderColor: COLORS.mediumGray, borderRadius: SIZES.radius, paddingVertical: 14, alignItems: 'center', marginBottom: 12 },
  socialButtonText: { ...FONTS.h4, color: COLORS.black },
  appleButton: { backgroundColor: COLORS.black, borderColor: COLORS.black },
  registerLink: { alignItems: 'center', marginTop: 20 },
  registerText: { ...FONTS.body2, color: COLORS.gray },
  registerLinkText: { color: COLORS.primary, fontWeight: '600' },
});
