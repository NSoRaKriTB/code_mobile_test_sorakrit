import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Product } from '../types/productType';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface ProductProps {
  products: Product[],
  stateFiltered: string
}


const ProductsTable: React.FC<ProductProps> = (props) => {
  const navigate = useNavigate()
 
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align='center'>Thumbnail</TableCell>
            <TableCell>Title</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Stock</TableCell>
            {props.stateFiltered === 'price unit' ? <TableCell align="right">Price Unit</TableCell> : null}
            {props.stateFiltered === 'rating' ? <TableCell align="right">Rating</TableCell> : null}
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.products.map((product) => (
            <TableRow
              key={product.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align='center' sx={{ padding: 0 }}>
                <img src={product.thumbnail} alt={product.title} style={{ width: '30px', height: '30px' }} />
              </TableCell>
              <TableCell component="th" scope="row">
                {product.title}
              </TableCell>
              <TableCell align="right">{product.price}</TableCell>
              <TableCell align="right">{product.stock}</TableCell>
              {props.stateFiltered === 'price unit' ? <TableCell align="right">{product.totalPrice?.toLocaleString()}</TableCell> : null}
              {props.stateFiltered === 'rating' ? <TableCell align="right">{product.rating}</TableCell> : null}
              <TableCell align="center">
                <Button variant='contained' color='primary'
                  onClick={
                    () => navigate(`/detail/${product.id}`, { replace: false })
                  }>
                  Detail
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ProductsTable