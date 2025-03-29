import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

const profile = () => {
  return (
    <View className='bg-primary w-full h-full items-center justify-center flex'>
      <View className='p-3 border border-white rounded-md'>
        <Image source={icons.person} className='size-8' resizeMode='cover'/>
      </View>
    </View>
  )
}

export default profile
