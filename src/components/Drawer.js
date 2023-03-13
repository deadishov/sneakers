export const Drawer = ({ cartMove, removeItem, items = [] }) => {
    return (
        <div className="overlay">
            <div className="drawer">
                <h2 className="mb-30 d-flex justify-between">Корзина <img onClick={cartMove} className="cu-p" src="/images/btn-remove.svg" alt="" /></h2>

                {items.length > 0 ? (
                    <div className="flex d-flex flex-column">
                        <div className="items">
                            {items.map((obj) => (
                                <div className="cartItem d-flex align-center mb-20">
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
                            <button className="greenButton">Оформить заказ <img src="/images/arrow.svg" alt="" /></button>
                        </div>
                    </div>
                ) : (
                    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
                        <img className="mb-20" width="120px" height="120px" src="/images/empty-cart.png" alt="Empty" />
                        <h2>Корзина пустая</h2>
                        <p className="opacity-6">Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
                        <button onClick={cartMove} className="greenButton">
                            <img src="/images/arrow.svg" alt="Arrow" />
                            Вернуться назад
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}