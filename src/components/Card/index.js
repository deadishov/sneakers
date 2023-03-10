import React from 'react'
import styles from './Card.module.scss'

export function Card({ onFavorite, onPlus, removeObj, image, title, price }) {
    const [isAdded, setIsAdded] = React.useState(false)
    const onClickPlus = () => {
        if (!isAdded) {
            onPlus({ image, title, price })
        }
        setIsAdded(!isAdded)
        if (isAdded) {
            removeObj({ image, title, price })
        }
    }

    return (
        <div className={styles.card}>
            <div className={styles.favorite} onClick={onFavorite}>
                <img src="/images/heart-unliked.svg" alt="" />
            </div>
            <img width={133} height={112} src={image} alt="" />
            <h5>{title}</h5>
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