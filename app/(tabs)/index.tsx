import { Image, StyleSheet, Platform, ScrollView, View, TouchableOpacity, TextInput, Keyboard } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState, useRef } from 'react';
import { StyledComponent } from 'nativewind';
import { Feather } from '@expo/vector-icons';
export default function HomeScreen() {
  const [focus, setFocus] = useState(false)
  const [searchText, setSearchText] = useState('')
  const navigation = useNavigation();
  const inputRef = useRef('')
  console.log("Text: " + searchText)
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <StyledComponent component={View} tw='flex flex-row  w-full items-center justify-between border-0 '>
          <StyledComponent component={ThemedText} tw='text-2xl font-medium '>Notes</StyledComponent>
          {!focus && searchText === '' ?(
            <TouchableOpacity onPress={()=> setFocus(true)}>

            <StyledComponent component={Feather} size={24} color={'black'} name='search'/>

          </TouchableOpacity>
           ):(
            <StyledComponent component={View}
            tw=' flex flex-row border-0 w-44 justify-between bg-slate-200 rounded-lg px-3'
            >
            
              <TextInput
                ref={inputRef}
                style={styles.searchBar}
                placeholder='Search'
                value={searchText}
                onChangeText={setSearchText}
                autoFocus={true}
                onBlur={() => {
                  if (searchText === ''){
                    setFocus(false)
                  }
                }}
                
              />
               <TouchableOpacity 
                  tw='opacity-50'
               onPress={()=> {setFocus(false); setSearchText(''); Keyboard.dismiss(); }}>
                  <StyledComponent component={Feather} size={24} color={'black'} name='x'
                  
                  />
               </TouchableOpacity>
            </StyledComponent>
           )}
          

        </StyledComponent>
      ),
    });
  }, [navigation, focus, searchText]);
  return (
    <ScrollView>
      <ThemedView style={styles.titleContainer}>
      
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,

  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
