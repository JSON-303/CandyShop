import React from 'react';
import { useNavigate } from 'react-router-dom';
import cartIcon from '../assets/cart-icon.png';



const Recipes = (props) => {
    const navigate = useNavigate();
    const {allrecipes} = props;
    const handleDetails = (id) => {
        navigate(`/candyshop/recipes/${id}`);
    };
    
    const handleOrderClick = () => {
        navigate('/candyshop/placeorder');
    };

    return (
        <div className="recipes-container">
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
            <h1>Use Sweet Tooth in your Home Recipes</h1>
            <ul className="recipes-list">
                {allrecipes.map(recipe => (
                    <li key={recipe.id} className="recipe-item">
                        <h2>{recipe.name}</h2>
                        <p>{recipe.shortDescription}</p>
                        <button onClick={() => handleDetails(recipe.id)}>View Details</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Recipes;
