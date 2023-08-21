import React, { useEffect, useState } from 'react'
import { requestMethods } from '../../core/enums/requestMethods';
import { sendRequest } from '../../core/config/request';
import FavCards from '../../components/FavCard';
import "./style.css"


function Favourite() {

    const [recipes, setRecipes]= useState([])

    const fetchData = async () =>{
        try {
            const response = await sendRequest({
                route: "/user/shopping-lists",
                method: requestMethods.GET,
            });
            console.log(response.shoppingList)
            setRecipes(response.shoppingList);
        } catch (error) {
            console.error('failed:', error);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);
    

    return (
        <div className='home-page-container'>
            <div className='page-title'>Favourites :</div>
            <FavCards recipes={recipes} setRecipes={setRecipes}/>
        </div>
    )
}

export default Favourite