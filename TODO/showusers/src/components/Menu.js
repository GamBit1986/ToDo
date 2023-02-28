import React from "react";
import UserList from "./User";
import "../App.css";
import {BrowserRouter, Link} from 'react-router-dom';


function NavbarItem({name, href}) {
    return (
        <li className="" >
            <Link className="" to={href}>{name}</Link>
        </li>
    )
    }



export default function Navbar({navbarItems}) {
    return (
        <nav className="menu">
            <BrowserRouter>
            <nav>
                <ul>
                    <li>
                        <Link to='/'>Users</Link>
                    </li>
                    <li>
                        <Link to='/projects'>Projects</Link>
                    </li>
                    <li>
                        <Link to='/todo'>ToDo</Link>
                    </li>
                </ul>

            </nav>
            <form className="">
                <input className="" placeholder="Search" aria-label="Search" />
                <button className=" " type="submit">Search</button>
            </form>
            </BrowserRouter>
        </nav> 
    )
}