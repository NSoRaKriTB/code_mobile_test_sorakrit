import React from 'react'
import { Product } from '../types/productType'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Container, Paper, Typography } from '@mui/material'
const DetailPage = () => {
  const { id } = useParams()
  const [products, setProducts] = React.useState<Product>()

  React.useEffect(() => {
    const fetchProducts = async () => {
      await axios.get(`https://dummyjson.com/products/${id}`)
        .then(response => {
          setProducts(response.data)
        })
    }
    fetchProducts()
    console.log('Component Updated')
    return () => {
      console.log('Component Unmounted')
    }
  }, [id])

  return (
    <Container
      sx={{
        backgroundColor: '#0a1426',
        padding: '1rem',
      }}
    >
      <Paper elevation={3} sx={{
        padding: '1rem',
        margin: '1rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
      }}>
        <img src={products?.thumbnail} alt={products?.title} style={{ width: '100%', height: 'auto', boxShadow: '0 0 10px rgba(0,0,0,0.5)' }} />
        <Typography variant="h3" component="h3" align="center">
          Detail Page
        </Typography>
        <Typography variant="h5" component="h5" align="center">
          {products?.title}
        </Typography>
        <Typography variant="body1" component="p" align="center">
          {products?.description}
        </Typography>
        <Typography variant="body1" component="p" align="center">
          Stock :  {products?.stock}
        </Typography>
      </Paper>
    </Container>

  )
}

export default DetailPage