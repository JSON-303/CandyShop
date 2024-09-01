import {React, useState, useEffect} from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import  recipes  from './Recipes.jsx';
import cartIcon from '../assets/cart-icon.png';
import CommentForm from './CommentForm.jsx';
import CommentDisplay from './CommentDisplay.jsx';

const RecipeDetails = (props) => {
    const {allrecipes} = props;
    const { id } = useParams();
    const navigate = useNavigate();
    const recipe = allrecipes.find(recipe => recipe.id === id);
    const [comments, setComments] = useState([]);

    if (!recipes) {
        return <p>Recipe not found</p>;
    }

    const { name, ingredients, directions } = recipe;

    const handleOrderClick = () => {
        navigate('/candyshop/placeorder');
    };

    //Get comments associated with this recipe
    useEffect(() => {
        axios.get(`http://localhost:9999/api/comments/${id}`)
        .then((res) => {
            console.log(res.data);
            setComments(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [])


    return (
        <div>
            <div className="recipe-details-container">
                <header className="header">
                    <h1>Sweet Tooth Haven!</h1>
                    <nav>
                        <button onClick={() => navigate('/candyshop/home')}>HOME</button>
                        <button onClick={() => navigate('/candyshop/candies')}>CANDIES</button>
                        <button onClick={handleOrderClick}>ORDER</button>
                        <img
                            src={cartIcon}
                            alt="Cart"
                            className="cart-icon"
                            onClick={() => navigate('/candyshop/checkout')}
                        />
                    </nav>
                </header>
                <div className="recipe-details">
                    <h1>{name}</h1>
                    <h2>Ingredients:</h2>
                    <ul>
                        {ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                    <h2>Directions:</h2>
                    <ol>
                        {directions.map((direction, index) => (
                            <li key={index}>{direction}</li>
                        ))}
                    </ol>
                    <button onClick={handleOrderClick}>Add to Order</button>
                </div>
            </div>
            <CommentDisplay comments={comments}/>
            <CommentForm recipeName={recipe.id}/>
        </div>
    );
};

export default RecipeDetails;
