import { StyleSheet, Text, View, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '@/constants/images'
import useFetch from '@/services/useFetch'
import { fetchMovies } from '@/services/api'
import MovieCard from '@/components/MovieCard'
import { icons } from '@/constants/icons'
import SearchBar from '@/components/SearchBar'

const search = () => {

  const [searchQuery, setSearchQuery] = useState("")
  const {
    data:movies,
    loading:movieLoading,
    error:movieError,
    refetch: loadMovies,
    reset
  } = useFetch(()=>fetchMovies({query:searchQuery}), false)

  useEffect(()=>{
    console.log(movies)
    const timeoutId = setTimeout(async () => {
      if(searchQuery.trim()){
        await loadMovies();
      }else{
        reset()
      }
    }, 500);
    return ()=> clearTimeout(timeoutId)
  },[searchQuery])

  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='flex-1 absolute w-full z-0' resizeMode='cover'/>
      <FlatList
        data={movies}
        renderItem={({item}) => <MovieCard {...item}/>}
        keyExtractor={(item)=>item.id.toString()}
        numColumns={3}
        className='px-5'
        columnWrapperStyle={{
          justifyContent:'center',
          gap: 16,
          marginVertical: 16
        }}
        contentContainerStyle={{paddingBottom:100}}
        ListHeaderComponent={
          <View>
            <View className='w-full flex-row mt-20 justify-center items-center'>
              <Image source={icons.logo}/>
            </View>

            <View className='my-5'>
              <SearchBar placeholder='Search ....' value={searchQuery} onChangeText={(text:string)=>setSearchQuery(text)}/>
            </View>
            {
              movieLoading && (
                <ActivityIndicator size='large' color="#0000ff" className='my-3'/>
              )
            }
            {
              movieError && (
                <Text className='text-red-500 px-5 my-3'>
                  Error: {movieError.message}
                </Text>
              )
            }
            {
              !movieLoading && !movieError && searchQuery.trim()
              && movies?.length! > 0 && (
                <Text className='border border-white text-xl text-white font-bold'>
                  Search Result for {' '}
                  <Text className='text-accent'>{searchQuery}</Text>
                </Text>
              )
            }
          </View>
        }
        ListEmptyComponent={
          !movieLoading && !movieError ? (
            <View className='mt-10 px-5'>
              <Text className='text-center text-gray-500'>
                {
                  searchQuery.trim() ? 'No movies found':'Search for a movie'
                }
              </Text>
            </View>
          ):null
        }
      />
    </View>
  )
}

export default search

const styles = StyleSheet.create({})