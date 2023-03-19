import React from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header'
import { Drawer } from './components/Drawer'
import { Home } from './pages/Home'
import { Favorites } from './pages/Favorites';
import AppContext from './context'

function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [favorites, setFavorites] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const [cartOpened, setCartOpened] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    async function fetchData() {
      const cartResponse = await axios.get('https://6409cbc1d16b1f3ed6dd2e0a.mockapi.io/cart')
      const favResponse = await axios.get('https://640ca2f4a3e07380e8f964c1.mockapi.io/favorites')
      const itemsResponse = await axios.get('https://6409cbc1d16b1f3ed6dd2e0a.mockapi.io/items')

      setIsLoading(false)

      setCartItems(cartResponse.data)
      setFavorites(favResponse.data)
      setItems(itemsResponse.data)
    }
    fetchData()
  }, [])

  const cartStatus = () => {
    setCartOpened(!cartOpened)
  }

  const onChangeInput = (event) => {
    setSearchValue(event.target.value)
  }

  const addToCart = (obj) => {
    // try {
    if (cartItems.find(item => item.id === obj.id)) {
      axios.delete(`https://6409cbc1d16b1f3ed6dd2e0a.mockapi.io/cart/${obj.id}`)
      setCartItems(prev => prev.filter(item => item.id !== obj.id))
    }
    else {
      axios.post('https://6409cbc1d16b1f3ed6dd2e0a.mockapi.io/cart', obj)
      setCartItems(prev => [...prev, obj])
      console.log(obj);
    }
    // } catch (error) {
    //   alert('Не удалось добавить в корзину')
    // }
  }

  const removeFromCart = (id) => {
    axios.delete(`https://6409cbc1d16b1f3ed6dd2e0a.mockapi.io/cart/${id}`)
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const addToFavorites = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(`https://640ca2f4a3e07380e8f964c1.mockapi.io/favorites/${obj.id}`)
        setFavorites(prev => prev.filter(item => item.id !== obj.id))
      } else {
        const { data } = await axios.post('https://640ca2f4a3e07380e8f964c1.mockapi.io/favorites', obj)
        setFavorites(prev => [...prev, data])
      }
    } catch (error) {
      console.log(error);
    }
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => obj.id === id)
  }


  return (
    <AppContext.Provider value={{ items, cartItems, favorites, isItemAdded, addToFavorites, cartStatus, setCartItems }}>
      <div className="wrapper clear">
        {cartOpened && <Drawer items={cartItems} cartMove={cartStatus} removeItem={removeFromCart} />}
        <Header cartMove={cartStatus} />
        <Routes>
          <Route path='/' exact element={
            <Home
              items={items}
              cartItems={cartItems}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeInput={onChangeInput}
              addToFavorites={addToFavorites}
              addToCart={addToCart}
              isLoading={isLoading}
            />
          } />
          <Route path='/favorites' element={<Favorites />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
