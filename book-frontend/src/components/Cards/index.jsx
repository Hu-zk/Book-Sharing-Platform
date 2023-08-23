import React, { useState } from 'react'
import { AiFillHeart, AiOutlineHeart, AiOutlinePlusCircle } from 'react-icons/ai';
import { sendRequest } from '../../core/config/request';
import { requestMethods } from '../../core/enums/requestMethods';

function Cards({books,setBooks,fetchData}) {

    const [activeRecipeIndex, setActiveRecipeIndex] = useState(null);

    if (!books) {
        return <p>No books</p>;
    }

    const toggleIngredients = (index) => {
        if (activeRecipeIndex === index) {
            setActiveRecipeIndex(null);
        } else {
            setActiveRecipeIndex(index);
        }
    };

    const toggleLike = async (bookId) => {
        try {
            const response = await sendRequest({
                route: `books/${bookId}/toggle-like`,
                method: requestMethods.POST,
            });
            console.log(response)
            
            setBooks((prevbooks) => {
                return prevbooks.map((book) => {
                    if (book._id === bookId) {
                        return {
                            ...book,
                            currentUserLiked: !book.currentUserLiked, 
                            liked_by: response.liked_by, 
                        };
                    }
                    return book;
                });
            });
        } catch (error) {
            console.error('Failed to toggle like:', error);
        }
    };

    const toggleShoppingList = async (recipeId) => {
        try {
            const response = await sendRequest({
                route: `/user/shopping-lists/toggle/${recipeId}`,
                method: requestMethods.POST,
            });
            console.log(response)
    
            setBooks((prevbooks) => {
                return prevbooks.map((recipe) => {
                    if (recipe.id === recipeId) {
                        return {
                            ...recipe,
                            shopping_lists: !recipe.shopping_lists,
                        };
                    }
                    fetchData()
                    return recipe;
                });
            });
        } catch (error) {
            console.error('Failed to toggle shopping list:', error);
        }
    };
    

    return (
        <div className="cards-container">
            {books.map((books,index)=>(
                    <div className="card" key={index}>
                        <img className='recipe-img' src={`http://127.0.0.1:8000/${books.image}`} alt="recipe img" />

                        <div className='recipe-cuisine'>{books.genre}</div>
                        <div className='recipe-cuisine'>{books.author}</div>
                        <div className='name-heart'>
                            <div className='recipe-name'>{books.title}</div>
                            <div className='card-icons'>
                                {/* <AiOutlinePlusCircle
                                    size={28}
                                    color={books.shopping_lists.length > 0 ? "blue" : "black"}
                                    onClick={() => toggleShoppingList(books.id)}
                                /> */}
                                {books.currentUserLiked ? (
                                    <AiFillHeart
                                        size={28}
                                        color="red"
                                        onClick={() => toggleLike(books._id)}
                                    />
                                ) : (
                                    <AiOutlineHeart
                                        size={28}
                                        onClick={() => toggleLike(books._id)}
                                    />
                                )}
                            </div>
                        </div>
                        <div className='recipe-name'>{books.review}</div>
                    </div>
            ))}
        </div>
    )
}

export default Cards