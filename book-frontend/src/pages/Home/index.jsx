import React, { useEffect, useState } from 'react'
import Cards from "../../components/Cards";
import { requestMethods } from '../../core/enums/requestMethods';
import { sendRequest } from '../../core/config/request';
import SearchBar from '../../components/SearchBar';
import './style.css';


function Home() {

    const [recipes, setRecipes]= useState([])

    const fetchData = async () =>{
        try {
            const response = await sendRequest({
                route: "/user/recipes/display",
                method: requestMethods.GET,
            });
            console.log(response.recipes)
            setRecipes(response.recipes);
        } catch (error) {
            console.error('failed:', error);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='home-page-container'>
            <SearchBar setRecipes={setRecipes}/>
            <Cards recipes={recipes} setRecipes={setRecipes} fetchData={fetchData}/>
        </div>
    )
}

export default Home