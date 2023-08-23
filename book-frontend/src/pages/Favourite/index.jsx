import React, { useEffect, useState } from 'react'
import { requestMethods } from '../../core/enums/requestMethods';
import { sendRequest } from '../../core/config/request';
import FavCards from '../../components/FavCard';
import "./style.css"


function Favourite() {

    const [books, setBooks]= useState([])

    const fetchData = async () =>{
        try {
            const response = await sendRequest({
                route: "/books/feed",
                method: requestMethods.GET,
            });
            console.log(response)
            setBooks(response);
        } catch (error) {
            console.error('failed:', error);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);
    

    return (
        <div className='home-page-container'>
            <div className='page-title'>Feed :</div>
            <FavCards books={books} setBooks={setBooks}/>
        </div>
    )
}

export default Favourite