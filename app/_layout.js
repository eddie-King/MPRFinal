import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';

import {NOTES, LABELS, TRASH} from '@/utils/dummy-data'
import {useDataContext} from '@/utils/context'
import Note from '@/model/Note';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const DataContext = useDataContext()

export default function RootLayout() {

  const [notes1, setNotes] = useState(NOTES)
  const [labels1, setLabels] = useState(LABELS)
  const [trashes1, setTrash] = useState(TRASH);

  const addNote = (id, content) =>{
    const newNote = new Note(id, null, [], content, new Date(), null  )
    setNotes((prevNotes) => [...prevNotes, newNote])
  }
  const minusNote = (note1)=>{
    setNotes(notes1.filter(n => n.id !== note1.id))
  }
  const updateNote = (note1)=>{
    setNotes(notes1.map(n => n.id === note1.id ? note1 : n))
  }

  const addLabel = (labe1) =>{
    setNotes([...labels1, labe1])
  }
  const minusLabel = (labe1)=>{
    setNotes(labels1.filter(n => n.id !== labe1.id))
  }
  const updateLabel = (labe1) => {
    setLabels(labels1.map(l => l.id === labe1.id ? labe1 : l));
  }
  const addTrash = (note) => {
    setTrash([...trashes1, note]);
  }
 
  const minusTrash = (note) => {
    setTrash(trashes1.filter(n => n.id !== note.id));
  }
 
  const updateTrash = (note) => {
    setTrash(trashes1.map(n => n.id === note.id ? note : n));
  }


  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }


  return (
  <DataContext.Provider value={{
    notes: {
      value: notes1, addNote, minusNote, updateNote
    },
    labels:{
      value: labels1, addLabel, minusLabel, updateLabel
    },
    trashes:{
      value: trashes1, addTrash, minusTrash, updateTrash
    }
  }}>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="Menus" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name='newNote'/>
        <Stack.Screen name='editNote'/>
      </Stack>
    </ThemeProvider>
  </DataContext.Provider>
  );
}
