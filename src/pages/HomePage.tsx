import axios from 'axios'
import React, { useMemo } from 'react'
import { Product } from '../types/productType'
import { useMultiplay } from '../hooks/useMultiply'
import { Box, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import ProductsTable from '../components/ProductsTable'

const HomePage = () => {
  const [search, setSearch] = React.useState<string>('')
  const [products, setProducts] = React.useState<Product[] | []>([])
  const [filteredProducts, setFilteredProducts] = React.useState<Product[] | []>([])
  const [stateFiltered, setStateFiltered] = React.useState<string>('all')

  React.useEffect(() => {

    console.log('Component mounted')
    const fetchProducts = async () => {
      await axios.get(`https://dummyjson.com/products`)
        .then(response => {
          setProducts(response.data.products)
          setFilteredProducts(response.data.products)
        })
    }
    fetchProducts()
    console.log('Component Updated')
    return () => {
      console.log('Component Unmounted')
    }
  }, [])
  console.log('asdasdasdas')
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setFilteredProducts(products.filter(product => product.title.toLowerCase().includes(search.toLowerCase()))
      )
    }, 1000);

    console.log('Search Updated')
    return () => clearTimeout(timer)
  }, [search, products])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }
  const handleFiter = (e: SelectChangeEvent<string>) => {
    setStateFiltered(e.target.value)
    switch (e.target.value) {
      case 'price more 1000':
        setFilteredProducts(products.filter(product => product.price > 1000))
        break
      case 'price unit':
        setFilteredProducts(
          products.map(product => {
            return {
              ...product,
              totalPrice: product.price * product.stock
            }
          }
          ))
        break
      case 'rating':
        setFilteredProducts(products.sort((a, b) => b.rating - a.rating))
        break
      case 'price sum':
        setFilteredProducts(products.sort((a, b) => a.price * a.stock - b.price * b.stock))
        break
      default:
        setFilteredProducts(products)
    }
  }

  const multiplyResult = useMultiplay(10)

  const totalPrice = useMemo(() => {
    return filteredProducts.reduce((acc, product) => acc + product.price * product.stock, 0)
  }, [filteredProducts])

  return (
    <Box sx={{ margin: '20px' }}>
      <div>
        <TextField label="ค้นหาข้อมูลสินค้า" onChange={handleSearch} size='small' />
        <Select
          label="sort"
          id='sort'
          value={stateFiltered}
          onChange={handleFiter}
          variant='outlined'
          size='small'
          sx={{ marginLeft: '10px', width: '200px' }}
        >
          <MenuItem value="all">ทั้งหมด</MenuItem>
          <MenuItem value="price more 1000">ราคามากว่า 1000</MenuItem>
          <MenuItem value="price unit">ราคารวมต่อชิ้น</MenuItem>
          <MenuItem value="rating">เรียงเรตติ้ง</MenuItem>
          <MenuItem value="price sum">แสดงราคารวมทั้งหมด</MenuItem>
        </Select>
      </div>
      <div>
        <p>Multiply Result : {multiplyResult()}</p>
        <p>Total Price : {totalPrice.toLocaleString('th-TH', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}
        </p>
      </div>

      <ProductsTable products={filteredProducts} stateFiltered={stateFiltered} />
    </Box >
  )
}

export default HomePage