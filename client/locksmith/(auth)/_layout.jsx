import { Text, View } from 'react-native';
import React, { useState } from 'react';
import {Stack} from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {useEffect} from 'react'

const AuthLayout = () => {
  
  const getData = async () => {
    const userEmail = 'john.doe@example.com'
    //const [tasks, setTasks] = useState(null)
    try {
        const response = await fetch(`/todos/${userEmail}`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const json = await response.json()
        //setTasks(json)
    } catch (err) {
        console.error('Fetch error:', err)
    }
}

  useEffect(() => getData,[])
  
 // console.log(tasks)
  return (
    <>
      <Stack>
        <Stack.Screen 
          name="sign-in"
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen 
          name="sign-up"
          options={{
            headerShown:false
          }}
        />
      </Stack>
      <StatusBar backgroundColor='#161622' 
        style= 'light'
        />
    </>
  )
}

export default AuthLayout

