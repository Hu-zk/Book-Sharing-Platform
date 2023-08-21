import React, { useState } from 'react'
import { AiFillHeart, AiOutlineHeart, AiOutlinePlusCircle, AiOutlineSend } from 'react-icons/ai';
import { sendRequest } from '../../core/config/request';
import { requestMethods } from '../../core/enums/requestMethods';

function Cards({recipes,setRecipes,fetchData}) {

    const [activeRecipeIndex, setActiveRecipeIndex] = useState(null);
    const [activeCommentIndex, setActiveCommentIndex] = useState(null);
    const [commentText, setCommentText] = useState('');
    // const [selectedDay, setSelectedDay] = useState(0); 

    // const daysOfWeek = ['None', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    if (!recipes) {
        return <p>No Recipes</p>;
    }

    // const handleDayChange = (event) => {
    //     setSelectedDay(parseInt(event.target.value));
    // };

    const toggleIngredients = (index) => {
        if (activeRecipeIndex === index) {
            setActiveRecipeIndex(null);
        } else {
            setActiveRecipeIndex(index);
        }
    };

    const toggleComments = (index) => {
        if (activeCommentIndex === index) {
            setActiveCommentIndex(null);
        } else {
            setActiveCommentIndex(index);
        }
    };

    const postComment = async (recipeId) => {
        try {
            console.log("hi")
            if (commentText.trim() === '') {
                return; 
            }
            console.log("hi2")
    
            const response = await sendRequest({
                route: '/user/recipes/comment',
                method: requestMethods.POST,
                body: {
                    recipe_id: recipeId,
                    comment: commentText,
                },
            });
            console.log(response)
    
            setRecipes((prevRecipes) => {
                return prevRecipes.map((recipe) => {
                    if (recipe.id === recipeId) {
                        return {
                            ...recipe,
                            comments: [...recipe.comments, { comment: commentText }],
                        };
                    }
                    return recipe;
                });
            });
    
            setCommentText('');
        } catch (error) {
            console.error('Failed to post comment:', error);
        }
    };

    const toggleLike = async (recipeId) => {
        try {
            const response = await sendRequest({
                route: `/user/recipes/${recipeId}/toggle-like`,
                method: requestMethods.POST,
            });
            
            setRecipes((prevRecipes) => {
                return prevRecipes.map((recipe) => {
                    if (recipe.id === recipeId) {
                        return {
                            ...recipe,
                            likes: response.like_count > 0 ? [{ user_id: response.user_id }] : [],
                        };
                    }
                    return recipe;
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
    
            setRecipes((prevRecipes) => {
                return prevRecipes.map((recipe) => {
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
            {recipes.map((recipes,index)=>(
                <div className='card-comment-container' key={index}>
                    <div className="card" >
                        <img className='recipe-img' src={`http://127.0.0.1:8000/storage/${recipes.image_path}`} alt="recipe img" />

                        <div className='recipe-cuisine'>{recipes.cuisine}</div>
                        <div className='name-heart'>
                            <div className='recipe-name'>{recipes.name}</div>
                            {/* <select value={selectedDay} onChange={handleDayChange}>
                                {daysOfWeek.map((day, dayIndex) => (
                                    <option key={dayIndex} value={dayIndex}>{day}</option>
                                ))}
                            </select> */}
                            <div className='card-icons'>
                                <AiOutlinePlusCircle
                                    size={28}
                                    color={recipes.shopping_lists.length > 0 ? "blue" : "black"}
                                    onClick={() => toggleShoppingList(recipes.id)}
                                />
                                {recipes.likes && recipes.likes.length > 0 ? (
                                    <AiFillHeart
                                        size={28}
                                        color="red"
                                        onClick={() => toggleLike(recipes.id)}
                                    />
                                ) : (
                                    <AiOutlineHeart
                                        size={28}
                                        onClick={() => toggleLike(recipes.id)}
                                    />
                                )}
                            </div>
                        </div>

                        <div className='recipe-ingredient' onClick={() => toggleIngredients(index)}>Ingredients</div>
                        {activeRecipeIndex === index && (
                            <ul className="ingredients-list">
                                {recipes.ingredients.map((ingredient, ingredientIndex) => (
                                    <li key={ingredientIndex}>{ingredient.name}</li>
                                ))}
                            </ul>
                        )}
                        <div className="recipe-ingredient" onClick={() => toggleComments(index)}>
                            Comments
                        </div>
                        {activeCommentIndex === index && recipes.comments && recipes.comments.length > 0 && (
                            <ul className="comments-list">
                                {recipes.comments.map((comment, commentIndex) => (
                                    <li key={commentIndex}>{comment.comment}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className='card-comment'>
                        <input type="text" placeholder='Add a Comment' onChange={(e) => setCommentText(e.target.value)}/>
                        <AiOutlineSend size={28}  onClick={() => postComment(recipes.id)} />                    
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Cards