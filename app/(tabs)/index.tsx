import { Image, StyleSheet, Platform, ScrollView, View, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState, useRef} from 'react';
import { StyledComponent } from 'nativewind';
import { Feather } from '@expo/vector-icons';
import { useNotes, useLabels } from '@/utils/context';

export default function HomeScreen() {
  const [focus, setFocus] = useState(false)
  const [searchText, setSearchText] = useState('')
  const navigation = useNavigation();

  const inputRef = useRef('')
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

  function timeAgo(dateString){
    const [datePart, timePart] = dateString.split(', ')
    const [day, month, year] = datePart.split('/')
    const [hours, minutes, seconds] = timePart.split(':')
    const past = new Date(year, month - 1, day ,hours, minutes, seconds)
    const now = new Date()

    const secondsDiff = Math.floor((now-past) / 1000)
    const minutesDiff = Math.floor(secondsDiff / 60)
    const hoursDiff = Math.floor(minutesDiff / 60)
    const daysDiff = Math.floor(hoursDiff / 24)
 
    if (daysDiff > 0){
      return `${daysDiff} days ago`;
    }else if(hoursDiff > 0){
      return `${hoursDiff} hrs ago`
    }else if(minutesDiff>0){
      return `${minutesDiff} min ago`
    }else{
      return `${seconds} sec ago`
    }
  }

  const { value: notes, addNote, minusNote, updateNote } = useNotes();
  const { value: labels, addLabel, minusLabel, updateLabel} = useLabels()


  console.log("Text: " + searchText)
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
       
             <ThemedText style={styles.titleContainer} type='link'>{filterNotes1.length} notes </ThemedText>      
        {filterNotes.length === 0 ? (
          <ThemedText style = {{}}> Please add a new note </ThemedText>
        ) : (
        filterNotes1.map(note=> (
      <StyledComponent key = {note.id} component={ThemedView} tw='flex border-0 content-center mt-7 shadow-xl rounded-2xl'>
        <StyledComponent component={ThemedView} tw=' border-0 p-3 space-y-1'>
        <StyledComponent component={ThemedText} tw='text-xs' type='subtitle'>{timeAgo(note.updateAt.toLocaleString())}</StyledComponent>
        
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
   
      <StyledComponent component={TouchableOpacity} tw='flex border-2 w-14 h-14 m-6 p-1 '>
          <StyledComponent component={Feather} name='plus' size={40}/>
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
