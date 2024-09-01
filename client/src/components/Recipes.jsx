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
            <header className="header d-flex justify-content-between bg-secondary-subtle rounded-bottom border-bottom border-dark">
                <h1 className="p-2 d-flex">Sweet Tooth Haven!</h1>
                <nav>
                    <button className="btn btn-success"  onClick={() => navigate('/candyshop/home')}>HOME</button>
                    <button className="btn btn-success mx-2"  onClick={() => navigate('/candyshop/candies')}>CANDIES</button>
                    <button className="btn btn-success"  onClick={handleOrderClick}>ORDER</button>
                    <img
                        src={cartIcon}
                        alt="Cart"
                        className="cart-icon"
                        onClick={() => navigate('/candyshop/checkout')}
                    />
                </nav>
            </header>
            <h2 className="text-center">Use Sweet Tooth in your Home Recipes</h2>
            <ul className="recipes-list">
                {allrecipes.map(recipe => (
                    <li key={recipe.id} className="recipe-item row border-bottom align-items-center">
                        <div className="m-2 col justify-content-end d-flex">
                            <img src={recipe.image} alt={recipe.name} className="recipe-image" />
                        </div>
                        <div className="col-6">
                            <h2>{recipe.name}</h2>
                            <p>{recipe.shortDescription}</p>
                        </div>
                        <div className="col">
                            <button onClick={() => handleDetails(recipe.id)} className="col btn btn-info mx-2">View Details</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Recipes;
