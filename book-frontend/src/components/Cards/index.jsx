import React from 'react'
import { AiFillHeart, AiOutlineHeart, AiOutlinePlusCircle } from 'react-icons/ai';
import { sendRequest } from '../../core/config/request';
import { requestMethods } from '../../core/enums/requestMethods';

function Cards({books,setBooks}) {

    if (!books || books.length === 0) {
        return <p>No books</p>;
    }

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

    const toggleFollow = async (userId,bookId) => {
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
        <div className="cards-container">
            {books.map((books,index)=>(
                    <div className="card" key={index}>
                        <div className='user-follow'>
                            <div className='recipe-name'>{books.postedByUser.name}</div>
                            <div className='card-icons'>
                            <AiOutlinePlusCircle
                                size={28}
                                color={books.currentUserFollowing ? "blue" : "black"}
                                onClick={() => toggleFollow(books.postedByUser._id,books._id)}
                            />
                            </div>
                        </div>
                        <img className='recipe-img' src={`http://127.0.0.1:8000/${books.image}`} alt="recipe img" />
                        <div className='details'>

                        <div>
                        <div className='recipe-cuisine'>{books.genre}</div>
                        <div className='recipe-cuisine'>{books.author}</div>
                        </div>
                        <div className='name-heart'>
                            <div className='recipe-name'>{books.title}</div>
                            <div className='card-icons'>
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
                        <div className='recipe-review'>{books.review}</div>
                        </div>
                    </div>
            ))}
        </div>
    )
}

export default Cards