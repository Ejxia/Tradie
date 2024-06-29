import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, useRouter } from 'expo-router'
import { API_BASE_URL } from '../../constants/config';

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const validateForm = () => {
    let newErrors = {}
    if (!form.username.trim()) {
      newErrors.username = 'Username is required'
    }
    if (!form.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Email is invalid'
    }
    if (!form.password.trim()) {
      newErrors.password = 'Password is required'
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (name, value) => {
    setForm(prevForm => ({
      ...prevForm,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }))
    }
  }

  const submit = async () => {
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(API_BASE_URL + '/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form)
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 409) {
          Alert.alert('Registration Failed', 'A user with this email already exists')
        } else {
          throw new Error(data.error || 'An error occurred during registration')
        }
      } else {
        Alert.alert('Success', 'User registered successfully', [
          { text: 'OK', onPress: () => router.push({ pathname: '/user-details', params: { email: form.email } }) }
        ])
        setForm({ username: '', email: '', password: '' })
        setErrors({})
      }
    } catch (error) {
      console.error('Signup error:', error)
      Alert.alert('Error', error.message || 'Failed to register user. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[83vh] px-4 my-6">
          <Image source={images.logo}
          resizeMode='contain' className="w-[115px] h-[35px]"/>
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Sign Up to Aora</Text>
          <FormField 
            title="Username"
            value={form.username}
            handleChangeText={(value) => handleChange('username', value)}
            otherStyles="mt-10"
            error={errors.username}
          />
          <FormField 
            title="Email"
            value={form.email}
            handleChangeText={(value) => handleChange('email', value)}
            otherStyles="mt-7"
            keyboardType="email-address"
            error={errors.email}
          />
          <FormField 
            title="Password"
            value={form.password}
            handleChangeText={(value) => handleChange('password', value)}
            otherStyles="mt-7"
            secureTextEntry
            error={errors.password}
          />

          <CustomButton 
            title="Sign Up" 
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link href="/sign-in" className="text-lg font-psemibold text-secondary-100">Sign In</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView> 
  )
}

export default SignUp