import React from 'react'
import ContentLoader from "react-content-loader"
import AppContext from '../../context'
import styles from './Card.module.scss'

export function Card({
    id,
    onFavorite,
    onPlus,
    image,
    name,
    price,
    favorited = false,
    loading = false
}) {
    const { isItemAdded } = React.useContext(AppContext)
    const [isFavorite, setIsFavorite] = React.useState(favorited)

    console.log(name, isItemAdded(id));

    const onClickPlus = () => {
        onPlus({ id, image, name, price })
    }

    const onLike = () => {
        setIsFavorite(!isFavorite)
        onFavorite({ id, image, name, price })
    }

    return (
        <div className={styles.card}>
            {
                loading ? <ContentLoader
                    speed={2}
                    width={170}
                    height={220}
                    viewBox="0 0 155 220"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="0" y="0" rx="10" ry="10" width="155" height="90" />
                    <rect x="0" y="100" rx="5" ry="5" width="155" height="15" />
                    <rect x="0" y="124" rx="5" ry="5" width="105" height="15" />
                    <rect x="124" y="180" rx="10" ry="10" width="32" height="32" />
                    <rect x="0" y="184" rx="5" ry="5" width="80" height="25" />
                </ContentLoader> : <>
                    <div className={styles.favorite}>
                        <img onClick={onLike} src={isFavorite ? "/images/heart-liked.svg" : "/images/heart-unliked.svg"} alt="" />
                    </div>
                    <img width={133} height={112} src={image} alt="" />
                    <h5>{name}</h5>
                    <div className="d-flex justify-between align-center">
                        <div className="d-flex flex-column">
                            <span>ЦЕНА:</span>
                            <b>{price} руб.</b>
                        </div>
                        <img className={styles.plus} onClick={onClickPlus} src={isItemAdded(id) ? "/images/btn-checked.svg" : "/images/btn-plus.svg"} alt="" />
                    </div>
                </>
            }
        </div>
    )
}