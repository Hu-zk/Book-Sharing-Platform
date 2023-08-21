import React, { useEffect, useState } from 'react';
import { sendRequest } from '../../core/config/request';
import { requestMethods } from '../../core/enums/requestMethods';
import Select from 'react-select';

import "./style.css"


function RecipeForm() {

    const [name, setName] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');


    const handleRecipeCreation = async (event) => {
        event.preventDefault();

        if (!name || !cuisine || selectedIngredients.length === 0 || !image) {
            setError('All fields are required');
            return;
        }
        
        try {
            const response = await sendRequest({
                route: "/user/recipes/create",
                method: requestMethods.POST,
                body:{
                    name,
                    cuisine,
                    image,
                    ingredients:selectedIngredients,
                }
            });
            console.log(response)
            setName("")
            setCuisine("")
            setSelectedIngredients([]);
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

    useEffect(() => {
        const fetchData = async () =>{
            try {
                const response = await sendRequest({
                    route: "/user/ingredients/display",
                    method: requestMethods.GET,
                });
                console.log(response)
                setIngredients(response.ingredients);
            } catch (error) {
                console.error('failed:', error);
            }
        }
        fetchData();
    }, []);

    const ingredientOptions = ingredients.map(ingredient => ({
        value: ingredient.id,
        label: ingredient.name
    }));

    return (
            <div className="create-form-container">
                <div className="form-header">
                    <h1>
                        Create Recipe
                    </h1>
                </div>

                <form className="create-form">


                        <div className="label-input">
                            <label htmlFor="name">Name </label>
                            <input required id="name" name="name" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>

                        <div className="label-input">
                            <label htmlFor="cuisine">Cuisine </label>
                            <input required id="cuisine" name="cuisine" type="text" placeholder="cuisine" value={cuisine} onChange={(e) => setCuisine(e.target.value)}/>
                        </div>

                        <div className="label-input">
                            <label htmlFor="image">Image </label>
                            <input required id="image" name="image" type="file" onChange={handleImageChange}/>
                        </div>

                        <div className="label-input">
                            <label htmlFor="ingredients">Ingredients </label>
                            <Select
                                required
                                className='select-ingredients'
                                id="ingredients"
                                name="ingredients"
                                isMulti
                                options={ingredientOptions}
                                value={ingredientOptions.filter(ingredient => selectedIngredients.includes(ingredient.value))}
                                onChange={(selectedOptions) =>
                                    setSelectedIngredients(selectedOptions.map(option => option.value))
                                }
                            />
                        </div>

                        {error && <p className="error-message">{error}</p>}

                    <button className='black-button' type="submit" onClick={handleRecipeCreation}>Create</button>
                </form>
            </div>
    )
}

export default RecipeForm