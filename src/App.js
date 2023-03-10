import React from 'react';
import { Card } from './components/Card'
import { Header } from './components/Header'
import { Drawer } from './components/Drawer'


function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [cartOpened, setCartOpened] = React.useState(false)

  React.useEffect(() => {
    fetch('https://6409cbc1d16b1f3ed6dd2e0a.mockapi.io/items')
      .then(res => {
        return res.json()
      })
      .then(res => {
        setItems(res);
      })
  }, [])

  const cartStatus = () => {
    setCartOpened(!cartOpened)
  }

  const addToCart = (obj) => {
    setCartItems(prev => [...prev, obj])
  }

  const removeFromCart = (obj) => {
    setCartItems(cartItems.filter(prev => prev != obj))
  }

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer items={cartItems} cartMove={cartStatus} />}
      <Header cartMove={cartStatus} />
      <div className="content p-40">
        <div className="d-flex justify-between align-center mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block">
            <img width={14} height={14} src="/images/search.svg" alt="" />
            <input placeholder="Поиск..." type="text" />
          </div>
        </div>
        <div className="sneakers d-flex justify-center flex-wrap">
          {items.map((item) => (
            <Card
              title={item.name}
              price={item.price}
              image={item.image}
              onFavorite={() => console.log('Добавлено в закладки')}
              onPlus={(obj) => addToCart(obj)}
              removeObj={(obj) => removeFromCart(obj)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
