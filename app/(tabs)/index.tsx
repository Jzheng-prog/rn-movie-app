import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { Link, useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, StatusBar, Text, View } from "react-native";

export default function Index() {

  const router = useRouter()

  const {
    data:movies,
    loading:movieLoading,
    error:movieError 
  } = useFetch(()=>fetchMovies({query:''}))

  // if (movies && Array.isArray(movies)) {
  //   console.log(movies[0].id)
  // } else {
  //   console.log('Movies not available or not an array')
  // }

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute z-0 w-full"/>
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{minHeight:'100%', paddingBottom:10}}>
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto"/>

        {
          movieLoading ? (
            <ActivityIndicator size='large' color='#000ff' className="mt-10 self-center"/>
          ): movieError ? (
            <Text className="text-white">Error: {movieError?.message}</Text>
          ):(
            <View className="flex-1 mt-5">
              <SearchBar placeholder="Search for movie" onPress={()=>router.push('/search')}/>
              <>
                <Text className="text-2xl text-white my-3 font-extrabold">Latest Movies</Text>
                
                <FlatList
                  data={movies}
                  keyExtractor={(item) => item.id.toString()}
                  numColumns={3}
                  scrollEnabled={false}
                  className="mt-2 pb-32"
                  columnWrapperStyle={{
                    justifyContent:'flex-start',
                    gap:20,
                    paddingRight:5,
                    marginBottom:10
                  }}
                  renderItem={({item})=>(
                    <MovieCard {...item}/>
                  )} 
                />
              </>
            </View>
          )
        }
      </ScrollView>
      <StatusBar
        barStyle='light-content'
      />
    </View>
  );
}
