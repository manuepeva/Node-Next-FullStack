import React, { useReducer } from 'react'
import {
    SUBIR_ARCHIVO_ERROR,
    SUBIR_ARCHIVO_EXITO,
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA,
    CREAR_ENLACE_ERROR,
    CREAR_ENLACE_EXITO
} from '../../context/types/index'
import appContext from './appContext'
import appReducer from './appReducer'


const AppState = ({ children }) => {
    const initialState = {
        mensaje_archivo: ''
    }

    // Crear dispatch y state 
    const [state, dispatch] = useReducer(appReducer, initialState)

    // Muestra una alerta
    const mostrarAlerta = msg => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: msg
        })
        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA
            })
        }, 3000);
    }
    return (
        <appContext.Provider
            value={{
                mensaje_archivo: state.mensaje_archivo,
                mostrarAlerta
            }}
        >
            {children}
        </appContext.Provider>
    )
}

export default AppState