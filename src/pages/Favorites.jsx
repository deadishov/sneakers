import { Card } from "../components/Card"

export function Favorites({ items, addToFavorites }) {
    return (
        <div className="content p-40">
            <div className="d-flex justify-between align-center mb-40">
                <h1>Мои закладки</h1>
            </div>
            <div className="sneakers d-flex justify-center flex-wrap">
                {items
                    .map((item, index) => (
                        <Card
                            key={index}
                            favorited={true}
                            onFavorite={addToFavorites}
                            {...item}
                        />
                    ))}
            </div>
        </div>
    )
}