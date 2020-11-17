import authContext from './authContext'
import React, { useReducer } from 'react'
import authReducer from './authReducer'
import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OCULTAR_ALERTA,
    LOGIN_ERROR,
    LOGIN_EXITOSO,
    USUARIO_AUTENTICADO,
    CERRAR_SESION
} from '../../context/types/'
import clienteAxios from '../../config/axios'
import tokenAuth from '../../config/tokenAuth'

const AuthState = ({ children }) => {

    // Definir el state inicial 
    const initialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
        autenticado: null,
        usuario: null,
        mensaje: null
    }
    // Definir el reducer
    const [state, dispatch] = useReducer(authReducer, initialState)
    // Registrar nuevos usuarios
    const registrarUsuario = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/usuarios', datos)
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data.msg
            })
        } catch (error) {
            dispatch({
                type: REGISTRO_ERROR,
                payload: error.response.data.msg
            })
        }

        // Limpia la alerta pasados tres segundos
        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA
            })
        }, 3000)
    }
    // Autenticar usuarios
    const iniciarSesion = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/auth', datos)
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data.token
            })
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            })
        }
        // Limpia la alerta pasados tres segundos
        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA
            })
        }, 3000)
    }
    // Retorna el usuario autenticado en base al json web token
    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token')
        if (token) {
            tokenAuth(token)
        }
        try {
            const respuesta = await clienteAxios.get('/api/auth')
            if (respuesta.data.usuario) {
                dispatch({
                    type: USUARIO_AUTENTICADO,
                    payload: respuesta.data.usuario
                })
            }

        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            })
        }
    }
    // Cerrar la sesión 
    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }

    return (
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                usuarioAutenticado,
                registrarUsuario,
                cerrarSesion,
                iniciarSesion
            }}
        >
            {children}
        </authContext.Provider>
    )
}

export default AuthState