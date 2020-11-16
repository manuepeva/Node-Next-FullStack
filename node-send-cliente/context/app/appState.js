import React, { useReducer } from 'react'
import clienteAxios from '../../config/axios'
import {
    SUBIR_ARCHIVO_ERROR,
    SUBIR_ARCHIVO_EXITO,
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA,
    CREAR_ENLACE_ERROR,
    CREAR_ENLACE_EXITO,
    SUBIR_ARCHIVO
} from '../../context/types/index'
import appContext from './appContext'
import appReducer from './appReducer'


const AppState = ({ children }) => {
    const initialState = {
        mensaje_archivo: '',
        nombre: '',
        nombre_original: '',
        cargando: null,
        descargas: 1,
        password: '',
        autor: null,
        url: ''
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
    // Sube los archivos al servidor
    const subirArchivo = async (formData, nombreArchivo) => {
        dispatch({
            type: SUBIR_ARCHIVO
        })
        try {
            const resultado = await clienteAxios.post('/api/archivos', formData)
            dispatch({
                type: SUBIR_ARCHIVO_EXITO,
                payload: {
                    nombre: resultado.data.archivo,
                    nombre_original: nombreArchivo
                }
            })
        } catch (error) {
            dispatch({
                type: SUBIR_ARCHIVO_ERROR,
                payload: error.response.data.msg
            })
        }
    }
    // Crea un enlace una vez que se subió un archivo
    const crearEnlace = async () => {
        const data = {
            nombre: state.nombre,
            nombre_original: state.nombre_original,
            descargas: state.descargas,
            password: state.password,
            autor: state.autor
        }
        try {
            const resultado = await clienteAxios.post('/api/enlaces', data)
            dispatch({
                type: CREAR_ENLACE_EXITO,
                payload: resultado.data.msg
            })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <appContext.Provider
            value={{
                nombre: state.nombre,
                nombre_original: state.nombre_original,
                mensaje_archivo: state.mensaje_archivo,
                cargando: state.cargando,
                descargas: state.descargas,
                password: state.password,
                autor: state.autor,
                url: state.url,
                mostrarAlerta,
                subirArchivo,
                crearEnlace
            }}
        >
            {children}
        </appContext.Provider>
    )
}

export default AppState