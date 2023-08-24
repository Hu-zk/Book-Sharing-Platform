import React from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { sendRequest } from '../../core/config/request';
import { requestMethods } from '../../core/enums/requestMethods';

function Cards({books,setBooks,fetchData}) {

    if (!books || books.length === 0) {
        return <p className='note'>No books</p>;
    }
    
    const userData = JSON.parse(localStorage.getItem('userData'));
    const currentUserId =userData.id;

    
    
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
        <div className="cards-container">
            {books.map((books,index)=>(
                    <div className="card" key={index}>
                        <div className='user-follow'>
                            <div className='recipe-name'>{books.postedByUser.name}</div>
                            { books.postedByUser._id !== currentUserId && (
                            <div className='card-icons'>
                                <AiOutlinePlusCircle
                                size={28}
                                color={books.currentUserFollowing ? 'blue' : 'black'}
                                onClick={() => toggleFollow(books.postedByUser._id)}
                                />
                            </div>
                            )}
                        </div>
                        <img className='recipe-img' src={`http://127.0.0.1:8000/${books.image}`} alt="recipe img" />

                        <div className='details'>
                            <div>
                            <div className='recipe-cuisine'><b>Genre :</b>{books.genre}</div>
                            <div className='recipe-cuisine'><b>Author :</b>{books.author}</div>
                            </div>

                            <div className='recipe-name'>{books.title}</div>
                        </div>
                    </div>
            ))}
        </div>
    )
}

export default Cards