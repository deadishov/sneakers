import { Card } from './components/Card'
import { Header } from './components/Header'
import { Drawer } from './components/Drawer'

const arr = [
  {
    name: 'Мужские Кроссовки Nike Blazer Mid Suede',
    price: 12999,
    image: '/images/sneakers/1.jpg'
  },
  {
    name: 'Мужские Кроссовки Nike Air Max 270',
    price: 12999,
    image: '/images/sneakers/2.jpg'
  },
  {
    name: 'Мужские Кроссовки Nike Blazer Mid Suede',
    price: 8499,
    image: '/images/sneakers/3.jpg'
  },
  {
    name: 'Кроссовки Puma X Aka Boku Future Rider',
    price: 8999,
    image: '/images/sneakers/4.jpg'
  },
];

function App() {
  return (
    <div className="wrapper clear">
      <Drawer />
      <Header />
      <div className="content p-40">
        <div className="d-flex justify-between align-center mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block">
            <img width={14} height={14} src="/images/search.svg" alt="" />
            <input placeholder="Поиск..." type="text" />
          </div>
        </div>
        <div className="sneakers d-flex justify-center">
          {arr.map((obj) => (
            <Card
              title={obj.name}
              price={obj.price}
              image={obj.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
