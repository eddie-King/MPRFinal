import {createContext, useContext} from 'react';
 const DataContext = createContext({
    notes: { value: [], addNote: (Note) => {}, minusNote: (Note) => {}, updateNote: (Note) => {}},
    labels: { value: [], addLabel: (Label) => {}, minusLabel: (Label) => {}, updateLabel: (Label) => {}},
    folders: { value: [], addFolder: (Folder) => {}, minusFolder: (Folder) => {}, updateFolder: (Folder) => {}},
    trashes: { value: [], addTrash: (Note) => {}, minusTrash: (Note) => {}, updateTrash: (Note) => {}},
});

export function useDataContext() {
   return DataContext;
    }

export function useNotes() {
    return useContext(DataContext).notes;
    }
        
export function useLabels() {
    return useContext(DataContext).labels;
    }
        
export function useFolders() {
    return useContext(DataContext).folders;
    }
export function useTrash(){
    return useContext(DataContext).trashes;
}
