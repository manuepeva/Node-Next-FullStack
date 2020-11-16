import Layout from '../../components/Layout'
import clienteAxios from '../../config/axios'

export async function getStaticProps() {
    const resultado = await clienteAxios.get('/api/enlaces/ni2ANtZ9C')
    console.log(resultado)
    return {
        props: {
            enlace: resultado.data
        }
    }
}

export async function getStaticPaths() {
    const enlaces = await clienteAxios.get('/api/enlaces')
    return {
        paths: enlaces.data.enlaces.map((enlace) => ({
            params: { enlace: enlace.url }
        })),
        fallback: false
    }
}


export default ({ enlace }) => {
    return (
        <Layout>
            <h1>Desde [enlace].js</h1>
        </Layout>
    )
}