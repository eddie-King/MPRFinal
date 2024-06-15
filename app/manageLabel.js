import { useState, useRef } from 'react';
import { Link, Stack } from 'expo-router';
import { StyleSheet, Image, Platform, TextInput, View , Text, TouchableOpacity, Alert} from 'react-native';
import { useNotes, useLabels, useTrash } from '@/utils/context';
import Label from '@/model/Label';
import { useRoute } from '@react-navigation/native';
import { StyledComponent } from 'nativewind';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
const manageLabel = () => {
    const [search, setSearch] = useState('')
    const { value: labels, addLabel, minusLabel, updateLabel} = useLabels()
    const [focus, setFocus] = useState(false)
    const inputRef = useRef('') 
    const route = useRoute()
    const {param} = route.params
    

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
      const handleLabel = ()=>{

      }
  return (
    <>
    <Stack.Screen options={{ title: 'Manage Label',
        headerTitleStyle:{
          fontSize: 20
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

      </StyledComponent>

    ):(
       <StyledComponent component={ThemedText} tw='ml-7'> {filterNotes1.length} total</StyledComponent>

    )}


      
      <StyledComponent component={View} tw='flex flex-row bg-transparent flex-wrap justify-center ml-2'>
        {filterNotes1.map((label, i) =>{
          if(param.labelIds.includes(label.id))
            return (
        <StyledComponent key = {label.id}component={View} tw='bg-sky-500 rounded mr-2 p-1 my-1 '>
            <StyledComponent component={Text} tw='px-1 text-lg text-white '>{label.label}</StyledComponent>
        </StyledComponent>)
        else 
        return (
          <StyledComponent key = {label.id}component={View} tw='bg-sky-200 rounded mr-2 p-1 my-1 '>
          <StyledComponent component={Text} tw='px-1 text-lg text-white '>{label.label}</StyledComponent>
      </StyledComponent>
        )
})}
        </StyledComponent>

    </>
  )
}

export default manageLabel