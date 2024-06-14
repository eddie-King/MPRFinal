import React, { useState, useRef } from 'react';
import { TextInput, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { Link, Stack } from 'expo-router';
import { useNotes, useTrash } from '@/utils/context';
import { StyledComponent } from 'nativewind';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Feather } from '@expo/vector-icons';
import Note from '@/model/Note';
import { useNavigation } from '@react-navigation/native';

const NewNote = () => {
  const [newNote, setNewNote] = useState('');
  const inputRef = useRef(null);
  const { value: notes, addNote, minusNote,} = useNotes();
  const {value: trashes, addTrash, minusTrash} = useTrash()
  const getId = ()=>{
   const noteMax = notes.reduce((max, note) => note.id > max ? note.id: max, 0) + 1
   const trashMax = trashes.reduce((max, note) => note.id > max? note.id: max, 0) +1
   return noteMax > trashMax ? noteMax: trashMax
  } 
  const navigation = useNavigation()

  const handleSubmmit = (id,note) =>{
    note = newNote
    if(note.trim() === ''){
      Alert.alert('Empty Note', 'You have not noted anything at all!');
      return
    }else if (notes.find((n) => n.content === note) !== undefined){
      Alert.alert('Duplicate Note', 'This note already exists!');
      return
    }
    id = getId()
    const newNote1 = new Note(id, null, [], note, new Date(), null  )
    addNote(newNote1)
    navigation.goBack()
  }



  return (
    <>
      <Stack.Screen options={{ title: 'New Note',
        headerTitleStyle:{
          fontSize: 20
        }
}} />

      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <StyledComponent component={ThemedView} tw='flex-1 border-0'>
          <StyledComponent component={ThemedView} tw='p-2 border-0'>
            <StyledComponent
              component={TextInput}
              multiline
              tw='flex text-lg m-3'
              placeholder='This is a simple note!'
              value={newNote}
              onChangeText={setNewNote}
              ref={inputRef}
            />
      
          </StyledComponent>
          <StyledComponent
            component={TouchableOpacity}
            onPress={handleSubmmit}
            tw='absolute border-0 rounded-full right-10 bottom-20 w-18 h-18 p-1 justify-center bg-blue-500 shadow-2xl opacity-100'
          >
            <StyledComponent component={Feather} name='check' color={'white'} size={50} />
          </StyledComponent>
        </StyledComponent>
      </TouchableWithoutFeedback>
    </>
  );
}

export default NewNote;
