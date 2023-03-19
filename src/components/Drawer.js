import React from "react"
import Info from "./Info"
import AppContext from "../context"
import axios from "axios"

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const Drawer = ({ cartMove, removeItem, items = [] }) => {
    const { cartItems, setCartItems } = React.useContext(AppContext)
    const [orderId, setOrderId] = React.useState(null)
    const [isOrderComplete, setIsOrderComplete] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)


    const onClickOrder = async () => {
        try {
            setIsLoading(true)
            const { data } = await axios.post('https://640ca2f4a3e07380e8f964c1.mockapi.io/orders', { items: cartItems })

            setOrderId(data.id)
            setIsOrderComplete(true)
            setCartItems([])

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete('https://6409cbc1d16b1f3ed6dd2e0a.mockapi.io/cart/' + item.id)
                await delay(1000)
            }

        } catch (error) {
            alert('Не удалось оформить заказ :(')
        }
        setIsLoading(false)
    }


    return (
        <div className="overlay">
            <div className="drawer">
                <h2 className="mb-30 d-flex justify-between">Корзина <img onClick={cartMove} className="cu-p" src="/images/btn-remove.svg" alt="" /></h2>

                {items.length > 0 ? (
                    <div className="flex d-flex flex-column">
                        <div className="items">
                            {items.map((obj) => (
                                <div key={obj.id} className="cartItem d-flex align-center mb-20">
                                    <div style={{ backgroundImage: `url(${obj.image})` }} className="cartItemImg"></div>
                                    <div className="mr-20 flex">
                                        <p className="mb-5">{obj.name}</p>
                                        <b>{obj.price} руб.</b>
                                    </div>
                                    <img onClick={() => removeItem(obj.id)} className="removeBtn" src="/images/btn-remove.svg" alt="" />
                                </div>
                            ))}
                        </div>
                        <div className="cartTotalBlock">
                            <ul>
                                <li>
                                    <span>Итого:</span>
                                    <div></div>
                                    <b>21 498 руб. </b>
                                </li>
                                <li>
                                    <span>Налог 5%:</span>
                                    <div></div>
                                    <b>1074 руб. </b>
                                </li>
                            </ul>
                            <button disabled={isLoading} onClick={onClickOrder} className="greenButton">Оформить заказ <img src="/images/arrow.svg" alt="" /></button>
                        </div>
                    </div>
                ) : (
                    <Info
                        title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
                        description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
                        image={isOrderComplete ? "/images/order-complete.jpg" : "/images/empty-cart.png"} />
                )}
            </div>
        </div>
    )
}