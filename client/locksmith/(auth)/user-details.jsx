import React, { useState } from 'react'
import { View, Text, ScrollView, Alert, TouchableOpacity, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Picker } from '@react-native-picker/picker'
import { useRouter, useLocalSearchParams } from 'expo-router'
import DateTimePickerModal from "react-native-modal-datetime-picker"

const UserDetails = () => {
  const router = useRouter()
  const { email } = useLocalSearchParams()
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    jobType: '',
    licenseNumber: '',
    licenseExpiry: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

  const jobTypes = ['Doctor', 'Nurse', 'Pharmacist', 'Therapist', 'Other']

  const handleChange = (name, value) => {
    setForm(prevForm => ({
      ...prevForm,
      [name]: value
    }))
  }

  const formatDate = (date) => {
    let d = date.getDate()
    let m = date.getMonth() + 1
    let y = date.getFullYear()
    return `${d < 10 ? '0' + d : d}/${m < 10 ? '0' + m : m}/${y}`
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = (date) => {
    hideDatePicker()
    handleChange('dateOfBirth', formatDate(date))
  }

  // ... (rest of the functions remain the same)

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[83vh] px-4 my-6">
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Additional Information</Text>
          <FormField 
            title="First Name"
            value={form.firstName}
            handleChangeText={(value) => handleChange('firstName', value)}
            otherStyles="mt-10"
          />
          <FormField 
            title="Last Name"
            value={form.lastName}
            handleChangeText={(value) => handleChange('lastName', value)}
            otherStyles="mt-7"
          />
          <View className="mt-7">
            <Text className="text-white mb-2">Date of Birth</Text>
            <TouchableOpacity onPress={showDatePicker} style={styles.datePickerButton}>
              <Text style={styles.datePickerButtonText}>
                {form.dateOfBirth || "Select Date of Birth"}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              maximumDate={new Date()} // This sets the maximum date to today
            />
          </View>
          
          {/* ... (rest of the form fields remain the same) */}

          <CustomButton 
            title="Submit" 
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  datePickerButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  datePickerButtonText: {
    color: 'black',
  },
});

export default UserDetails