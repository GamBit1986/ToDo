import React from "react";
import UserList from "./User";
import "../App.css";

function NavbarItem({name, href}) {
    return (
        <li className="">
            <a className="" to={href}>{name}</a>
        </li>
    )
    }



export default function Navbar({navbarItems}) {
    return (
        <nav className="menu">
            <a className="" href="#">Главная</a>
            <button className="" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="">
                <span className=""></span>
            </button>
            <div className="" id="navbarCollapse">
                <ul className="">
                    <li className="menu">
                        {navbarItems.map((item) => <NavbarItem name={item.name} href={item.href} />)}
                    </li>
                </ul>
                <form className="">
                    <input className="" placeholder="Search" aria-label="Search" />
                    <button className=" " type="submit">Search</button>
                </form>
            </div>
        </nav> 
    )
}