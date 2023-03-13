import React from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header'
import { Drawer } from './components/Drawer'
import { Home } from './pages/Home'
import { Favorites } from './pages/Favorites';


function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [favorites, setFavorites] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const [cartOpened, setCartOpened] = React.useState(false)

  React.useEffect(() => {
    axios.get('https://6409cbc1d16b1f3ed6dd2e0a.mockapi.io/items')
      .then(res => {
        setItems(res.data);
      })
    axios.get('https://6409cbc1d16b1f3ed6dd2e0a.mockapi.io/cart')
      .then(res => {
        setCartItems(res.data)
      })
    axios.get('https://640ca2f4a3e07380e8f964c1.mockapi.io/favorites')
      .then(res => {
        setFavorites(res.data)
      })
  }, [])

  const cartStatus = () => {
    setCartOpened(!cartOpened)
  }

  const onChangeInput = (event) => {
    setSearchValue(event.target.value)
  }

  const addToCart = async (obj) => {
    try {
      const { data } = await axios.post('https://6409cbc1d16b1f3ed6dd2e0a.mockapi.io/cart', obj)
      setCartItems(prev => [...prev, data])
    } catch (error) {
      alert('Не удалось добавить в корзину')
    }
  }

  const removeFromCart = (id) => {
    axios.delete(`https://6409cbc1d16b1f3ed6dd2e0a.mockapi.io/cart/${id}`)
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const addToFavorites = async (obj) => {
    if (favorites.find(favObj => favObj.id === obj.id)) {
      axios.delete(`https://640ca2f4a3e07380e8f964c1.mockapi.io/favorites/${obj.id}`)
    } else {
      const { data } = await axios.post('https://640ca2f4a3e07380e8f964c1.mockapi.io/favorites', obj)
      setFavorites(prev => [...prev, data])
    }
  }


  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer items={cartItems} cartMove={cartStatus} removeItem={removeFromCart} />}
      <Header cartMove={cartStatus} />
      <Routes>
        <Route path='/' exact element={
          <Home
            items={items}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeInput={onChangeInput}
            addToFavorites={addToFavorites}
            addToCart={addToCart}
          />
        } />
        <Route path='/favorites' element={<Favorites
          items={favorites}
          addToFavorites={addToFavorites}
        />}
        />
      </Routes>
    </div>
  );
}

export default App;
