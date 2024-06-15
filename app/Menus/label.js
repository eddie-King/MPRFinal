import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, TextInput, View , Text, TouchableOpacity, Alert} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyledComponent } from 'nativewind';
import { Link, Stack } from 'expo-router';
import { useState, useRef } from 'react';
import { useNotes, useLabels, useTrash } from '@/utils/context';
import Label from '@/model/Label';
export default function TabTwoScreen() {
  const [search, setSearch] = useState('')
  const { value: labels, addLabel, minusLabel, updateLabel} = useLabels()
  const [focus, setFocus] = useState(false)
  const inputRef = useRef('') 
  function filterNotes(labels, searchText){
    if (!searchText.trim()){
      return labels
    }
    const lowercasedFilter = searchText.toLowerCase()
    return labels.filter(note => 
      note.label.toLowerCase().includes(lowercasedFilter)
    )
  }
  const filterNotes1 = filterNotes(labels, search) 
  function handleCreate(){
    if(search.trim() === "") return;
    const labelExit = labels.some(label => label.label.toLowerCase() === search.toLocaleLowerCase())
    if (labelExit){
      Alert.alert("This label already exists","Try another name!")
      return
    }
    addLabel(search)
  }
  

  return (
    <>
<Stack.Screen options={{ title: 'Labels',
        headerTitleStyle:{
          fontSize: 24,
            }
}} />
    <StyledComponent component={ThemedView}>
      <StyledComponent component={TextInput} 
      ref={inputRef}
      tw='ml-5 text-lg p-3'
      placeholder='Search or create label...'
      value={search}
      onChangeText={setSearch}
      autoFocus={true}
      onBlur={() => {
        if (search === ''){
          setFocus(false)
        }}}
      />
    </StyledComponent>
    {(search !== '' && search )? (
      <StyledComponent component={View}> 

        <StyledComponent component={ThemedText} tw='ml-7'> {filterNotes1.length} total</StyledComponent>
        <StyledComponent component={TouchableOpacity} tw='ml-7' onPress={handleCreate}>
          <StyledComponent component={ThemedText} type='link'>+Create lable "{search}" </StyledComponent>
        </StyledComponent>

      </StyledComponent>

    ):(
       <StyledComponent component={ThemedText} tw='ml-7'> {filterNotes1.length} total</StyledComponent>

    )}
    

    <StyledComponent component={View} tw='flex flex-row bg-transparent flex-wrap justify-center ml-2'>
        {filterNotes1.map((label) =>(
        <StyledComponent key = {label.id}component={View} tw='bg-sky-400 rounded mr-2 p-1 my-1 '>
            <StyledComponent component={Text} tw='px-1 text-lg text-white '>{label.label}</StyledComponent>
        </StyledComponent>
        ))}
        </StyledComponent>
    </>
  )
}


