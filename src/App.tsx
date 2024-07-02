import Navbar from './components/Navbar'
import './App.css'
import Products from './components/Products'
import { useEffect } from 'react'
import { fetchData } from './redux/products/productsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './redux/store'

function App() {
  const dispatch = useDispatch()
  const pageNo = useSelector((state:RootState)=>state.products.pageNo)
  const searchText = useSelector((state:RootState)=>state.products.searchText)

  useEffect(()=>{
      dispatch(fetchData(`https://stageapi.monkcommerce.app/task/products/search?search=${searchText}&page=${pageNo}&limit=10`));

  },[pageNo])
  return (
    <div>
      <Navbar />
      <Products />
    </div>
  )
}

export default App
