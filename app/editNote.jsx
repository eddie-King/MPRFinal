import React, { useRef, useState } from 'react'
import { Button, StatusBar, TextInput, View, Alert, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { Link, Stack, useNavigation } from 'expo-router';
import { useRoute } from '@react-navigation/native';
import { LogBox } from 'react-native';
import { StyledComponent } from 'nativewind';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useNotes, useLabels, useTrash, useColors } from '@/utils/context';
import Note from '@/model/Note';
import { Modalize } from 'react-native-modalize';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
const EditNote = () => {
  const { value: labels, addLabel, minusLabel, updateLabel} = useLabels()
  const route = useRoute()
  const navigation = useNavigation()
  const inputRef = useRef(null);
  const {param1} = route.params
  const [text, setOnChangetext] = useState(param1.content)
  const {value: notes, addNote, minusNote, updateNote} = useNotes();
  const {value: trashes, addTrash, minusTrash, updateTrash} = useTrash()
  const {value: colors} = useColors()
  const [color, setColor] = useState(param1.color)

  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const secondsDiff = Math.floor((now - date) / 1000);

    if (secondsDiff < 60) {
      return `${secondsDiff} sec ago`;
    }

    const minutesDiff = Math.floor(secondsDiff / 60);
    if (minutesDiff < 60) {
      return `${minutesDiff} min ago`;
    }

    const hoursDiff = Math.floor(minutesDiff / 60);
    if(hoursDiff<24){
    return `${hoursDiff} hrs ago`;
    }

    const dayDiff = Math.floor(hoursDiff / 24)
    return `${dayDiff} days ago`
  };

  const newNote = new Note(param1.id, param1.color, param1.labelIds, text, new Date(), param1.isBookmarked  )
  function update (text){
    setOnChangetext(text)
    updateNote(newNote)
  }

  const newColorNote = new Note(param1.id, color, param1.labelIds, param1.content, new Date(), param1.isBookmarked  )
  function updateColor(color){
    setColor(color)
    updateNote(newColorNote)
  }

  const handleSubmit = (note) => {
    if (note.content.trim() === '') {
         return;
    }
    note.updateAt = new Date();
    updateNote(note);
   
}
 function handleDelete(){
  minusNote(param1)
  addTrash(param1)
  Alert.alert('Successfull', 'Your note had been deleted!');
  navigation.goBack()
  console.log("Trash: " + trashes)
 }


  const modalizeRef = useRef(null);
  const onOpen = () => {
    modalizeRef.current?.open();
  };



  return (
    <>
    <Stack.Screen options={{ title: 'Note',
        headerTitleStyle:{
          fontSize: 20
        }
}} />
    
        <StyledComponent component={View} tw='flex flex-row border-2 border-dashed space-x-3 p-2 m-5  ' >
          {param1.labelIds.map((labelIds, index) => (
            
             <StyledComponent key={index} component={ThemedView} tw='bg-slate-100 p-1 '>
         
             <StyledComponent component={ThemedText} tw='text-sm'>{labels[index].label}</StyledComponent>
             
         </StyledComponent>
             ))}
        </StyledComponent>

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <StyledComponent component={View} tw='flex-1 border-0'>
        <StyledComponent component={View} tw='p-2 border-'>
        <StyledComponent component={TextInput} 
        multiline 
        value={text} 
        ref={inputRef}
        onChangeText={update} 
        tw='ml-6 text-lg'/>
        </StyledComponent>
        </StyledComponent>
        </TouchableWithoutFeedback>
      <StyledComponent component={GestureHandlerRootView} 
      tw='absolute flex-row border-0 bottom-6 w-full justify-between bg-neutral-300 p-3 rounded-lg'>

      <StyledComponent component={View}>
          <StyledComponent component={ThemedText} tw='basis-1/2'>Edited {timeAgo(param1.updateAt)} </StyledComponent>
      </StyledComponent>
      
          <StyledComponent component={TouchableOpacity} tw='' 
          onPress= { ()=> { param1.isBookmarked = !param1.isBookmarked ; handleSubmit(param1)} }>

            {param1.isBookmarked? (<Ionicons name="bookmark" size={24} color="#FFC700" />) :(<Ionicons name="bookmark-outline" size={24} color="black" />) }
          </StyledComponent>

          <StyledComponent component={TouchableOpacity} tw='mr-4'> 
          <FontAwesome5 onPress={onOpen} name="ellipsis-v" size={24} color="black" />
          </StyledComponent>
  
  



      <Modalize ref={modalizeRef} snapPoint={400}>
        <StyledComponent component={ThemedView} tw=''>
        <StyledComponent component={ScrollView} tw='space-x-3 ml-5 pt-3' horizontal= {true} showsHorizontalScrollIndicator={false}>
             {colors.map((color) =>{
              return(
                <StyledComponent key={color} 
                style={{backgroundColor: color}} 
                onPress={()=> {updateColor(color)}}
                component={TouchableOpacity}
                tw='flex border-0 rounded-full h-10 w-10 justify-center relative items-center'>
                {color == null && <StyledComponent component={MaterialIcons} name="dnd-forwardslash" tw='' size={24} color="black" />}
                {param1.color === color && <StyledComponent component={FontAwesome6} tw='absolute top-2 left-2' name="check" size={24} color="black" /> }
                </StyledComponent>
              )
             })}
            
        </StyledComponent>
        
        <StyledComponent component={View} tw='flex flex-row border-0 border-dashed space-x-3 p-2 m-2 ml-4  ' >
          {param1.labelIds.map((labelIds, index) => (
             <StyledComponent key={index} component={ThemedView} tw='bg-slate-100 p-1 '>
        
             <StyledComponent component={ThemedText} tw='text-sm'>{labels[index].label}</StyledComponent>
 
         </StyledComponent>
             ))}
          <StyledComponent component={TouchableOpacity} tw='bg-slate-100 p-1 '>
        
        <StyledComponent component={ThemedText} tw='text-sm'>+ Manage labels</StyledComponent>

    </StyledComponent>
        </StyledComponent>

        <StyledComponent component={TouchableOpacity} tw=' h-12 ml-3 items-center px-2 flex flex-row'>
        <Feather name="clipboard" size={24} color="gray" />
           <StyledComponent component={ThemedText} tw='px-2'>Copy to clipboard</StyledComponent>
          </StyledComponent>

          <StyledComponent component={TouchableOpacity} tw=' h-12 ml-3 items-center px-2 flex flex-row'>
          <AntDesign name="sharealt" size={24} color="gray" />
           <StyledComponent component={ThemedText} tw='px-2'>Share</StyledComponent>
          </StyledComponent>

          <StyledComponent component={TouchableOpacity} onPress={handleDelete} tw=' h-12 ml-3 items-center px-2 flex flex-row'>
          <Feather name="trash-2" size={24} color="gray" />
           <StyledComponent component={ThemedText} tw='px-2'>Delete</StyledComponent>
          </StyledComponent>

          <StyledComponent component={TouchableOpacity} tw=' h-12 ml-3 items-center px-2 flex flex-row'>
          <AntDesign name="copy1" size={24} color="gray" />
           <StyledComponent component={ThemedText} tw='px-2'>Make a copy</StyledComponent>
          </StyledComponent>

          <StyledComponent component={TouchableOpacity} tw=' h-12 ml-3 items-center px-2 flex flex-row'>
          <FontAwesome name="map-pin" size={24} color="gray" />
           <StyledComponent component={ThemedText} tw='px-2'>Pin</StyledComponent>
          </StyledComponent>

          <StyledComponent component={TouchableOpacity} tw=' h-12 ml-3 items-center px-2 flex flex-row'>
          <Ionicons name="alarm-outline" size={24} color="gray" />
           <StyledComponent component={ThemedText} tw='px-2'>Add a reminder</StyledComponent>
          </StyledComponent>
        
        </StyledComponent>
      </Modalize>

   
    </StyledComponent>
    </>
  )
}

export default EditNote