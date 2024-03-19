//JUST CONTEXT SYNTAX TO USE IN NOTECONTEXT

import { createContext, useContext } from "react"; 

const noteContext = createContext();

export const useNoteContext = ()=>{
    const context = useContext(noteContext)
    return context
}

export default noteContext;