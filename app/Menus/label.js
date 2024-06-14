import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, TextInput, View , Text} from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyledComponent } from 'nativewind';
import { Link, Stack } from 'expo-router';
import { useState } from 'react';
import { useNotes, useLabels, useTrash } from '@/utils/context';
export default function TabTwoScreen() {
  const [search, setSearch] = useState('')
  const { value: labels, addLabel, minusLabel, updateLabel} = useLabels()

  return (
    <>
<Stack.Screen options={{ title: 'Labels',
        headerTitleStyle:{
          fontSize: 24,
            }
}} />
    <StyledComponent component={ThemedView}>
      <StyledComponent component={TextInput} 
      value={search} 
      onChange={setSearch} 
      tw='ml-5 text-lg p-3'
      placeholder='Search or create label...'
      />
    </StyledComponent>

    <StyledComponent component={ThemedText} tw='ml-7'> {labels.length} total</StyledComponent>


    <StyledComponent component={View} tw='border-2 p-4'>
        {labels.map((labelIds, index) =>(
        <StyledComponent key = {index}component={View} tw='border-2 m-2   '>
            <StyledComponent component={Text} tw='text-xl inline-block m-2  '>{labelIds.label}</StyledComponent>
        </StyledComponent>
        ))}
        </StyledComponent>
    </>
  )
}


