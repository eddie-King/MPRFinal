import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { View, Text, SafeAreaView, Image, TextInput } from 'react-native';
import { DrawerItemList } from '@react-navigation/drawer';
import { AntDesign, Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { StyledComponent } from 'nativewind';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
export default function Layout() {
  const [focus, setFocus] = useState(false);
  const color = useThemeColor({light:'black', dark: 'white'},'background')
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
      screenOptions={{
        drawerPosition: 'left',
        drawerType:'front',
        drawerStyle:{
          backgroundColor: '#021520',
          width: 250
        },
        headerShown:true,
        drawerInactiveTintColor: '#021520',
        drawerLabelStyle:{
          color: 'white'
        }
      }}
      
      drawerContent={
        (props) =>{
          return (
            <SafeAreaView>
              <View style = {{
                height: 50,
                width: '100%',
                justifyContent: 'center',
                alignItems:'center',
                backgroundColor: '#021520',
                paddingBottom: 12,
              
              }}>

                <Text style ={{
                  color:'white',
                  fontWeight: 800,
                  fontSize: 25
                  }}>
                   Notes App
                   </Text>

              </View>
              <DrawerItemList {...props}/>
            </SafeAreaView>
          )
        }
      }
      
      >
        <Drawer.Screen
          name="index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Home',
            title:'Notes',
            headerTitleAlign:'left',
            drawerIcon:()=>(
              <AntDesign name="home" size={24} color="white" />
            )
          }}
        />
        <Drawer.Screen
          name="label" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Labels',
            title: 'Labels',
            drawerIcon: ()=>(
              <MaterialIcons name="label" size={24} color="white" />
            )
          }}
        />
        <Drawer.Screen
          name="folder" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Folders',
            title: 'Folders',
            drawerIcon: ()=>(
              <AntDesign name="folder1" size={24} color="white" />
            )
          }}
        />
        <Drawer.Screen
          name="trash" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Trash',
            title: 'Trash',
            drawerIcon: ()=>(
              <Entypo name="trash" size={24} color="white" />
            )
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
