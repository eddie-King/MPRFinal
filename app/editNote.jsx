import React, {useCallback, useMemo, useRef, useState } from 'react'
import { Button, StatusBar, TextInput, View, Text } from 'react-native'
import { Link, Stack, useNavigation } from 'expo-router';
import { useRoute } from '@react-navigation/native';
import { LogBox } from 'react-native';
import { StyledComponent } from 'nativewind';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useNotes, useLabels, useTrash } from '@/utils/context';
import Note from '@/model/Note';
import { Modalize } from 'react-native-modalize';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
const EditNote = () => {
  const { value: labels, addLabel, minusLabel, updateLabel} = useLabels()
  const route = useRoute()
  const {param1} = route.params
  const [text, setOnChangetext] = useState(param1.content)
  const { value: notes, addNote, minusNote, updateNote} = useNotes();
  const {value: trashes, addTrash, minusTrash} = useTrash()

  const newNote = new Note(param1.id, param1.color, param1.labelIds, text, new Date(), param1.isBookmarked  )
  function update (text){
    setOnChangetext(text)
    updateNote(newNote)
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

        <StyledComponent component={TextInput} value={text} onChangeText={update} tw='ml-6'/>
        

        <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
      <Button title="Open Modalize" onPress={onOpen} />
      <Modalize ref={modalizeRef} snapPoint={180}>
        <View style={{ padding: 20 }}>
          <Text>Content here</Text>
        </View>
      </Modalize>
    </View>
    </GestureHandlerRootView>


    </>
  )
}

export default EditNote