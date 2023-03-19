import React from 'react'
import { Card } from '../components/Card'


export function Home({
    items,
    searchValue,
    setSearchValue,
    onChangeInput,
    addToFavorites,
    addToCart,
    isLoading
}) {

    const renderItems = () => {
        const filtredItems = items.filter((item) =>
            item.name.toLowerCase().includes(searchValue.toLowerCase()),
        );
        return (isLoading ? [...Array(12)] : filtredItems).map((item, index) => (
            <Card
                key={index}
                onFavorite={(obj) => addToFavorites(obj)}
                onPlus={(obj) => addToCart(obj)}
                loading={isLoading}
                {...item}
            />
        ));
    };
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
            <div className="sneakers d-flex justify-center flex-wrap">{renderItems()}</div>
        </div>
    )
}