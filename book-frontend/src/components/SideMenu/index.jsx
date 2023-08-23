import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import './style.css'

function SideMenu() {
    const navigation = useNavigate();


    const handleLogout = () => {
        localStorage.clear();
        navigation("/");
    }

    const navActive = ({ isActive }) => {
        return {
            color: isActive ? "#f43f5e" : null,
        };
    };

    return (
        <div id="side-menu">

            <div className="insta-title">
                <div className="menu-titles">
                    <i className="fa-solid fa-book-open-reader menu-icons"></i>
                </div>
                <h4>Booky</h4>
            </div>

            <div className="menu-section">

                <NavLink style={navActive} end to="/user" >
                    <div className="menu-pages">
                        <div className="menu-titles">
                            <i className="fa-solid fa-house menu-icons "></i>
                        </div>
                        <h4>Home</h4>
                    </div>
                </NavLink>

                <NavLink style={navActive} end to="/user/favourites" >
                    <div className="menu-pages">
                        <div className="menu-titles">
                        <i className="fa-solid fa-book menu-icons"></i>
                        </div>
                        <h4>Feed</h4>
                    </div>
                </NavLink>

                <NavLink style={navActive} end to="/user/create" >
                    <div className="menu-pages" >
                        <div className="menu-titles">
                        <i className="fa-regular fa-square-plus menu-icons"></i>
                        </div>
                        <h4>Create</h4>
                    </div>
                </NavLink>

            </div>

                <div className="menu-pages" onClick={handleLogout}>
                    <div className="menu-titles">
                    <i className="fa-solid fa-right-from-bracket menu-icons"></i>
                    </div>
                    <h4>Logout</h4>
                </div>
        </div>
    )
}

export default SideMenu