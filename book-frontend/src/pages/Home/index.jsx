import React, { useEffect, useState } from 'react'
import Cards from "../../components/Cards";
import { requestMethods } from '../../core/enums/requestMethods';
import { sendRequest } from '../../core/config/request';
import SearchBar from '../../components/SearchBar';
import './style.css';


function Home() {

    const [books, setBooks]= useState([])

    const fetchData = async () =>{
        try {
            const response = await sendRequest({
                route: "/books/",
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
            <SearchBar setBooks={setBooks}/>
            <Cards books={books} setBooks={setBooks} fetchData={fetchData}/>
        </div>
    )
}

export default Home