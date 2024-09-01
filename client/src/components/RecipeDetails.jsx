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
            <div>
                <header className="header d-flex justify-content-between bg-secondary-subtle rounded-bottom border-bottom border-dark">
                    <div className="p-2 d-flex">
                        <h1 className="">Sweet Tooth Haven!</h1>
                    </div>
                    <nav className="ms-auto">
                        <button className="btn btn-success" onClick={() => navigate('/candyshop/home')}>HOME</button>
                        <button className="btn btn-success mx-2" onClick={() => navigate('/candyshop/candies')}>CANDIES</button>
                        <button className="btn btn-success" onClick={handleOrderClick}>ORDER</button>
                        <img
                            src={cartIcon}
                            alt="Cart"
                            className="cart-icon"
                            onClick={() => navigate('/candyshop/checkout')}
                        />
                    </nav>
                </header>
                <div className="">
                    <h2 className="m-3 border-bottom text-center">{name}</h2>
                    <div className="d-flex">
                        <div>
                            <img src={recipe.image} alt={recipe.name} className="recipe-details-image border border-danger border-3 mx-3"/>
                        </div>
                        <div className="text-left">
                            <h3>Ingredients:</h3>
                            <ul className="">
                                {ingredients.map((ingredient, index) => (
                                    <li key={index} className="">{ingredient}</li>
                                ))}
                            </ul>
                            <h3>Directions:</h3>
                            <ol>
                                {directions.map((direction, index) => (
                                    <li key={index} className="">{direction}</li>
                                ))}
                            </ol>
                            <button className="btn btn-primary" onClick={handleOrderClick}>Add to Order</button>
                        </div>
                    </div>
                </div>
            </div>
            <CommentDisplay comments={comments}/>
            <CommentForm recipeName={recipe.id}/>
        </div>
    );
};

export default RecipeDetails;
