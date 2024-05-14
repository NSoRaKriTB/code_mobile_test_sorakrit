
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import DetailPage from './pages/DetailPage'
import { useSelector } from 'react-redux'
import { RootState } from './redux/store'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

const Router = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  console.log(isAuthenticated)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/home' element={isAuthenticated ? <HomePage /> : <Navigate to='/' />} />
        <Route path='/detail/:id' element={isAuthenticated ? <DetailPage /> : <Navigate to='/' />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router