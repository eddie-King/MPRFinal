import { StyleSheet, ScrollView, View, TouchableOpacity, TextInput, Keyboard } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState, useRef} from 'react';
import { StyledComponent } from 'nativewind';
import { Feather } from '@expo/vector-icons';
import { useNotes, useLabels } from '@/utils/context';
import { useThemeColor } from '@/hooks/useThemeColor';


export default function HomeScreen() {
  const [focus, setFocus] = useState(false)
  const [searchText, setSearchText] = useState('')
  const navigation = useNavigation();
  
  const inputRef = useRef('')

  const color = useThemeColor({light:'black', dark: 'white'},'background')
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <StyledComponent component={View} tw='flex flex-row  w-full items-center justify-between border-0 '>
          <StyledComponent component={ThemedText} tw='text-2xl font-medium '>Notes</StyledComponent>
          {!focus && searchText === '' ?(
            <TouchableOpacity onPress={()=> setFocus(true)}>

            <StyledComponent component={Feather} size={24} color={color} name='search'/>

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
                  <StyledComponent component={Feather} size={24} color={color} name='x'
                  
                  />
               </TouchableOpacity>
            </StyledComponent>
           )}
          

        </StyledComponent>
      ),
    });
  }, [navigation, focus, searchText]);


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
  

  const { value: notes, addNote, minusNote, updateNote } = useNotes();
  const { value: labels, addLabel, minusLabel, updateLabel} = useLabels()


  console.log("Text: " + timeAgo(notes[1].updateAt))
  function filterNotes(notes, searchText){
    if (!searchText.trim()){
      return notes
    }
    const lowercasedFilter = searchText.toLowerCase()
    return notes.filter(note => 
      note.content.toLowerCase().includes(lowercasedFilter)
    )
  }
  const filterNotes1 = filterNotes(notes, searchText)
 
  

  return (
    <View style = {styles.container}>
   
    <ScrollView style = {styles.mainContainer}>
          {searchText === ''? (
            <ThemedText style={styles.titleContainer} type='link'>{filterNotes1.length} notes </ThemedText>
          ):(
            <ThemedText style={styles.titleContainer} type='link'>{notes.filter(x => x.content.toLowerCase().includes(searchText.toLowerCase())).length} notes found </ThemedText>
          )}   
        {filterNotes.length === 0 ? (
          <ThemedText style = {{}}> Please add a new note </ThemedText>
        ) : (
        filterNotes1.map(note=> (
      <StyledComponent key = {note.id} component={ThemedView} tw='flex border-0 content-center mt-7 shadow-xl rounded-2xl'>
        <StyledComponent onPress={()=>
         navigation.navigate("editNote",{
        param1: note
      })} component={TouchableOpacity} tw=' border-0 p-3 space-y-1'>
        <StyledComponent component={ThemedText} tw='text-xs' type='subtitle'>{timeAgo(note.updateAt)}</StyledComponent>
        
        <StyledComponent component={ThemedView} tw='flex flex-row space-x-3  '>
        { note.labelIds.map((labelIds, index) =>(
        <StyledComponent key={index} component={ThemedView} tw='bg-slate-100 p-1 '>
        
            <StyledComponent component={ThemedText} tw='text-sm'>{labels[index].label}</StyledComponent>

        </StyledComponent>
        ))}
        </StyledComponent>
        
        <StyledComponent component={ThemedView}>
          <StyledComponent component={ThemedText}> {note.content} </StyledComponent>
        </StyledComponent>
        </StyledComponent>
      </StyledComponent>
)))}
    </ScrollView>
   
      <StyledComponent component={TouchableOpacity} 
      onPress={()=> navigation.navigate("newNote")}
      tw='absolute border-0 rounded-full right-10 bottom-20 w-18 h-18 p-1 justify-center bg-blue-500 shadow-2xl opacity-100  '>
          <StyledComponent component={Feather} name='plus' color={'white'} size={50}/>
      </StyledComponent>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mainContainer:{
    flex: 1,
    margin: 6,
    padding: 10,
    flexDirection: 'column',
  },
  titleContainer: {
    flex: 1,
    gap: 8,
    
  }
});
