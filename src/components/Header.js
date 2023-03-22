import React from "react"
import { Link } from "react-router-dom"
import { useCart } from "../hooks/useCart"

export const Header = (props) => {
    const { totalPrice } = useCart()


    return (
        <header className="d-flex justify-between align-center p-40">
            <Link to={"/"}>
                <div className="headerLeft d-flex align-center">
                    <img width={40} height={40} src="/images/logo.png" alt="lll" />
                    <div>
                        <h3>REACT SNEAKERS</h3>
                        <p className="opacity-5">Магазин лучших кроссовок</p>
                    </div>
                </div>
            </Link>
            <ul className="headerRight d-flex">
                <li className="mr-30" onClick={props.cartMove}>
                    <img width={18} height={18} src="/images/cart.svg" alt="cart" />
                    <span>{totalPrice} руб.</span>
                </li>
                <li>
                    <Link to={"/favorites"}>
                        <img className="mr-20" width={18} height={18} src="/images/favorite.svg" alt="user" />
                    </Link>
                </li>
                <li>
                    <Link to={"/orders"}>
                        <img width={18} height={18} src="/images/user.svg" alt="user" />
                    </Link>
                </li>
            </ul>
        </header>
    )
}