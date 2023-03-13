import { Card } from '../components/Card'

export function Home({ items, searchValue, setSearchValue, onChangeInput, addToFavorites, addToCart }) {
    return (
        <div className="content p-40">
            <div className="d-flex justify-between align-center mb-40">
                <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}</h1>
                <div className="search-block">
                    <img width={14} height={14} src="/images/search.svg" alt="" />
                    {searchValue && <img onClick={() => setSearchValue('')} className="clear cu-p" src="/images/btn-remove.svg" alt="" />}
                    <input onChange={onChangeInput} value={searchValue} placeholder="Поиск..." type="text" />
                </div>
            </div>
            <div className="sneakers d-flex justify-center flex-wrap">
                {items
                    .filter((item) => item.name.toLowerCase().includes(searchValue))
                    .map((item, index) => (
                        <Card
                            key={index}
                            onFavorite={(obj) => addToFavorites(obj)}
                            onPlus={(obj) => addToCart(obj)}
                            {...item}
                        />
                    ))}
            </div>
        </div>
    )
}