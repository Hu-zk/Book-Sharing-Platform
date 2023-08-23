import React, { useState } from 'react';
import { sendRequest } from '../../core/config/request';
import { requestMethods } from '../../core/enums/requestMethods';
import Select from 'react-select';

import "./style.css"


function BookForm() {

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [review, setReview] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');


    const handleBookCreation = async (event) => {
        event.preventDefault();

        if (!review || !title || !author || selectedGenre.length === 0 || !image) {
            setError('All fields are required');
            return;
        }
        
        try {
            const response = await sendRequest({
                route: "/books/",
                method: requestMethods.POST,
                body:{
                    title,
                    author,
                    review,
                    image,
                    genre:selectedGenre,
                }
            });
            console.log(response)
            setTitle("")
            setAuthor("")
            setReview("")
            setSelectedGenre("");
            setImage(null);

        } catch (error) {
            console.error('failed:', error);
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result.split(',')[1]); 
            };
            reader.readAsDataURL(file);
        }
    };

    const genreOptions = [
        { value: "Action", label: "Action" },
        { value: "Comedy", label: "Comedy" },
        { value: "Fantasy", label: "Fantasy" }
    ];

    return (
            <div className="create-form-container">
                <div className="form-header">
                    <h1>
                        Create Book
                    </h1>
                </div>

                <form className="create-form">


                        <div className="label-input">
                            <label htmlFor="title">Title </label>
                            <input required id="title" name="title" type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                        </div>

                        <div className="label-input">
                            <label htmlFor="author">Author </label>
                            <input required id="author" name="author" type="text" placeholder="author" value={author} onChange={(e) => setAuthor(e.target.value)}/>
                        </div>

                        <div className="label-input">
                            <label htmlFor="review">Review </label>
                            <input required id="review" name="review" type="text" placeholder="review" value={review} onChange={(e) => setReview(e.target.value)}/>
                        </div>

                        <div className="label-input">
                            <label htmlFor="image">Image </label>
                            <input required id="image" name="image" type="file" onChange={handleImageChange}/>
                        </div>

                        <div className="label-input">
                            <label htmlFor="genre">Genre </label>
                            <Select
                                required
                                className='select-genre'
                                id="genre"
                                name="genre"
                                options={genreOptions}
                                value={selectedGenre}
                                onChange={(selectedOptions) => setSelectedGenre(selectedOptions)}
                            />
                        </div>

                        {error && <p className="error-message">{error}</p>}

                    <button className='black-button' type="submit" onClick={handleBookCreation}>Create</button>
                </form>
            </div>
    )
}

export default BookForm