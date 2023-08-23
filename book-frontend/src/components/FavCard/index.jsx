import React, { useState } from 'react'
import { AiFillHeart, AiOutlineHeart, AiOutlinePlusCircle } from 'react-icons/ai';
import { sendRequest } from '../../core/config/request';
import { requestMethods } from '../../core/enums/requestMethods';

function Cards({books,setBooks}) {

    const [ActiveReview, setActiveReview] = useState(null);


    if (!books || books.length === 0) {
        return <p className='note'>No books</p>;
    }

    const toggleIngredients = (index) => {
        if (ActiveReview === index) {
            setActiveReview(null);
        } else {
            setActiveReview(index);
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

    const toggleFollow = async (userId) => {
        try {
            const response = await sendRequest({
                route: `users/${userId}/toggle-follow`,
                method: requestMethods.POST,
            });
            console.log(response)
    
            setBooks((prevBooks) => {
                return prevBooks.map((book) => {
                    if (book.posted_by === userId) {
                        return {
                            ...book,
                            currentUserFollowing: !book.currentUserFollowing,
                        };
                    }
                    return book;
                });
            });
        } catch (error) {
            console.error('Failed to toggle follow:', error);
        }
    };
    
    return (
        <div className="feed-cards-container">
            {books.map((books,index)=>(
                    <div className="feed-card" key={index}>
                        <div className='feed-user-follow'>
                            <div className='feed-name'>{books.postedByUser.name}</div>
                            <div className='card-icons'>
                            <AiOutlinePlusCircle
                                size={32}
                                color={books.currentUserFollowing ? "blue" : "black"}
                                onClick={() => toggleFollow(books.postedByUser._id,books._id)}
                            />
                            </div>
                        </div>
                        <img className='feed-img' src={`http://127.0.0.1:8000/${books.image}`} alt="recipe img" />
                        <div className='details'>

                        <div>
                        <div className='feed-cuisine'><b>Genre :</b> {books.genre}</div>
                        <div className='feed-cuisine'><b>Author :</b> {books.author}</div>
                        </div>
                        <div className='name-heart'>
                            <div className='feed-name'>{books.title}</div>
                            <div className='card-icons'>
                                {books.currentUserLiked ? (
                                    <AiFillHeart
                                        size={36}
                                        color="red"
                                        onClick={() => toggleLike(books._id)}
                                    />
                                ) : (
                                    <AiOutlineHeart
                                        size={36}
                                        onClick={() => toggleLike(books._id)}
                                    />
                                )}
                            </div>
                        </div>
                        <div className='recipe-ingredient' onClick={() => toggleIngredients(index)}>Review</div>
                        {ActiveReview === index && (
                        <div className='recipe-review'>{books.review}</div>
                        )}

                        </div>
                    </div>
            ))}
        </div>
    )
}

export default Cards