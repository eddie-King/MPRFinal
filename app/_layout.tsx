import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';

import {NOTES, LABELS, TRASH} from '@/utils/dummy-data'
import {useDataContext} from '@/utils/context'
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const DataContext = useDataContext()

export default function RootLayout() {

  const [notes1, setNotes] = useState(NOTES)
  const [labels1, setLabels] = useState(LABELS)
  const [trash1, setTrash] = useState(TRASH)

  const addNote = (note1) =>{
    setNotes([...notes1, note1])
  }
  const minusNote = (note1)=>{
    setNotes(notes1.filter(n => n.id !== note1.id))
  }
  const updateNote = (note1)=>{
    setNotes(notes1.map(n => n.id === note1.id ? note1 : n))
  }

  const addLabel = (labe1) =>{
    setNotes([...labels1, label1])
  }
  const minusLabel = (labe1)=>{
    setNotes(labels1.filter(n => n.id !== labe1.id))
  }
  const updateLabel = (labe1) => {
    setLabels(labels1.map(l => l.id === labe1.id ? labe1 : l));
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
    }
  }}>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  </DataContext.Provider>
  );
}
