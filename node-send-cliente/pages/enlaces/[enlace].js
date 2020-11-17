import Layout from '../../components/Layout'
import clienteAxios from '../../config/axios'
import React, { useState } from 'react'

export async function getServerSideProps({ params }) {
    const { enlace } = params
    const resultado = await clienteAxios.get(`/api/enlaces/${enlace}`)
    return {
        props: {
            enlace: resultado.data
        }
    }
}

export async function getServerSidePaths() {
    const enlaces = await clienteAxios.get('/api/enlaces')
    return {
        paths: enlaces.data.enlaces.map((enlace) => ({
            params: { enlace: enlace.url }
        })),
        fallback: false
    }
}


export default ({ enlace }) => {
    const [tienePassword, setTienePassword] = useState(enlace.password)
    console.log(tienePassword)
    const verificarContraseña = e => {
        e.preventDefault();
        console.log('verificando...')
    }
    return (
        <Layout>
            {
                tienePassword ? (
                    <>
                        <p className="text-center">Este enlace está protegido por una contraseña</p>
                        <div className="flex justify-center mt-5">
                            <div
                                className="w-full max-w-lg">
                                <form
                                    className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                                    onSubmit={e => verificarContraseña(e)}
                                >
                                    <div className="mb-4">
                                        <label
                                            className="block text-black text-sm font-bold mb-2"
                                            htmlFor="password"
                                        >Contraseña</label>
                                        <input
                                            type="password"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="password"
                                            placeholder="Contraseña del enlace"
                                        />
                                    </div>
                                    <input
                                        type="submit"
                                        className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold"
                                        value="Validar Contraseña"
                                    />
                                </form>
                            </div>
                        </div>
                    </>
                ) : (
                        <>
                            <h1 className="text-4xl text-center text-gray-700">Descarga Tu Archivo</h1>
                            <div className="flex items-center justify-center mt-10">
                                <a
                                    href={`${process.env.backendURL}/api/archivos/${enlace.archivo}`}
                                    className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer"
                                >Aquí</a>
                            </div>
                        </>
                    )
            }

        </Layout>
    )
}