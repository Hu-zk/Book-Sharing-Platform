import React, { useState } from 'react'

function FavCards({recipes}) {

    const [activeRecipeIndex, setActiveRecipeIndex] = useState(null);
    
    if (!recipes) {
        return <p>No Favourite Recipes</p>;
    }

    const toggleIngredients = (index) => {
        if (activeRecipeIndex === index) {
            setActiveRecipeIndex(null);
        } else {
            setActiveRecipeIndex(index);
        }
    };

    return (
        <div className="cards-container">
            {recipes.map((recipes,index)=>(
                    <div className="card" key={index}>
                        <img className='recipe-img' src={`http://127.0.0.1:8000/storage/${recipes.recipe.image_path}`} alt="recipe img" />

                        <div className='recipe-cuisine'>{recipes.recipe.cuisine}</div>
                        <div className='name-heart'>
                            <div className='recipe-name'>{recipes.recipe.name}</div>
                        </div>

                        <div className='recipe-ingredient' onClick={() => toggleIngredients(index)}>Ingredients</div>
                        {activeRecipeIndex === index && (
                            <ul className="ingredients-list">
                                {recipes.recipe.ingredients.map((ingredient, ingredientIndex) => (
                                    <li key={ingredientIndex}>{ingredient.name}</li>
                                ))}
                            </ul>
                        )}
                    </div>
            ))}
        </div>
    )
}

export default FavCards