import { StyledComponent } from 'nativewind'
import { Stack } from 'expo-router'
import { View, TouchableOpacity, ScrollView,StyleSheet, Alert } from 'react-native'
import { useNotes, useLabels, useTrash } from '@/utils/context';
import { ThemedView} from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText';
const trash = () => {
  const {value: notes, addNote, minusNote, setNotes} = useNotes();
  const {value: trashes, addTrash, minusTrash, updateTrash, emptyTrash} = useTrash()
  const { value: labels, addLabel, minusLabel, updateLabel} = useLabels()

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
  // const handleRestore = (note) => {
  //  console.log(note)
  // };

  // const handleDelete = (note) => {
   
  // };
  // const handleNotePress = (note) => {
  //   Alert.alert(
  //     '',
  //     '',
  //     [
  //       {
  //         text: 'Restore',
  //         onPress: () => handleRestore(note),
  //       },
  //       {
  //         text: 'Delete Permanently',
  //         onPress: () => handleDelete(note),
  //         style: 'destructive',
  //       },
  //     ],
  //     { cancelable: true }
  //   );
  // };

  function restoreAll(){
    setNotes([...notes,...trashes])
    emptyTrash()

  }
  function emptyAll(){
    emptyTrash()
  }
  return (
    <>
    <Stack.Screen options={{ title: 'Trash',
        headerTitleStyle:{
          fontSize: 24,
            }
}} />
     
     <View style = {styles.container}>

  
   
    <ScrollView style = {styles.mainContainer}>
         <StyledComponent component={View} tw='flex-row justify-between'>
            <ThemedText style={styles.titleContainer} type='link'>{trashes.length} notes in trash </ThemedText>
            <StyledComponent component={View} tw='flex flex-row bg-transparent items-center space-x-2'>
              <StyledComponent component={TouchableOpacity} onPress={restoreAll} tw='items-center bg-slate-200 p-2 px-4 rounded'>
                <StyledComponent component={ThemedText} tw='font-semibold'>Restore</StyledComponent>
              </StyledComponent>
              <StyledComponent component={TouchableOpacity}onPress={()=>emptyAll()} tw='items-center bg-red-500 p-2 px-4 rounded'>
                <StyledComponent component={ThemedText} tw='font-semibold'>Empty</StyledComponent>
              </StyledComponent>
            </StyledComponent>
         </StyledComponent>
        {trashes.length === 0 ? (
          <StyledComponent component={View} tw='flex border-0 top-60  items-center justify-center'>
          <StyledComponent component={ThemedText} > Empty trash! </StyledComponent>
          </StyledComponent>
        ) : (
        
        trashes.map(note=> (
      <StyledComponent key = {note.id} component={ThemedView} tw='flex border-0 content-center mt-7 shadow-xl rounded-2xl'>
        <StyledComponent component={TouchableOpacity}  tw=' border-0 p-3 space-y-1'>
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
)))
}
    </ScrollView>
   
    </View>


</>
  )
}


export default trash
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