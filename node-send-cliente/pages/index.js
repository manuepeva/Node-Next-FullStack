import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, { useContext, useEffect } from 'react'
import Layout from '../components/Layout'
import authContext from '../context/auth/authContext'


const Index = () => {

  // Extraer el usuario autenticado del storage 
  const AuthContext = useContext(authContext)
  const { usuarioAutenticado } = AuthContext
  useEffect(() => {
    usuarioAutenticado()
  }, [])
  return (
    <Layout>
      <h1>Index</h1>
    </Layout>
  )
}
export default Index