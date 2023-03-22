import React from "react";
import { Card } from "../components/Card";
import { AppContext } from "../context";

export function Favorites() {
    const { favorites, addToFavorites } = React.useContext(AppContext);

    return (
        <div className="content p-40">
            <div className="d-flex justify-between align-center mb-40">
                <h1>Мои закладки</h1>
            </div>
            <div className="sneakers d-flex justify-center flex-wrap">
                {favorites
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