import React from 'react'
import styles from './Card.module.scss'

export function Card({ id, onFavorite, onPlus, image, name, price, favorited = false }) {
    const [isAdded, setIsAdded] = React.useState(false)
    const [isFavorite, setIsFavorite] = React.useState(favorited)
    const onClickPlus = () => {
        setIsAdded(!isAdded)
        if (!isAdded) {
            onPlus({ id, image, name, price })
        }
    }

    const onLike = () => {
        setIsFavorite(!isFavorite)
        onFavorite({ id, image, name, price })
    }

    return (
        <div className={styles.card}>
            <div className={styles.favorite} onClick={onFavorite}>
                <img onClick={onLike} src={isFavorite ? "/images/heart-liked.svg" : "/images/heart-unliked.svg"} alt="" />
            </div>
            <img width={133} height={112} src={image} alt="" />
            <h5>{name}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>ЦЕНА:</span>
                    <b>{price} руб.</b>
                </div>
                <img className={styles.plus} onClick={onClickPlus} src={isAdded ? "/images/btn-checked.svg" : "/images/btn-plus.svg"} alt="" />
            </div>
        </div>
    )
}