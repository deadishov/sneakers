import styles from './Card.module.scss'

export function Card(props) {
    return (
        <div className={styles.card}>
            <div className={styles.favorite}>
                <img src="/images/heart-unliked.svg" alt="" />
            </div>
            <img width={133} height={112} src={props.image} alt="" />
            <h5>{props.title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>ЦЕНА:</span>
                    <b>{props.price} руб.</b>
                </div>
                <button className="button d-flex align-center justify-center">
                    <img width={11} height={11} src="/images/plus.svg" alt="" />
                </button>
            </div>
        </div>
    )
}