import React from 'react';
import { useNavigate } from 'react-router-dom';
import cartIcon from '../assets/cart-icon.png';

const Home = () => {
    const navigate = useNavigate();

    const handleOrderClick = () => {
        navigate('/candyshop/placeorder');
    };

    const handleCandiesClick = () => {
        navigate('/candyshop/candies');
    };

    return (
        <div className="home-container">
            <header className="header">
                <h1>Sweet Tooth Haven!</h1>
                <nav>
                    <button onClick={() => navigate('/candyshop/candies')}>CANDIES</button>
                    <button onClick={() => navigate('/candyshop/recipes')}>RECIPES</button>
                    <button onClick={handleOrderClick}>ORDER</button>
                    <img
                        src={cartIcon}
                        alt="Cart"
                        className="cart-icon"
                        onClick={() => navigate('/checkout')}
                    />
                </nav>
            </header>
            <main className="home-main">
                <section className="about-us">
                    <h2>About Us</h2>
                    <p>
                        We’re three software engineers from different parts of the world who share a passion for candy and spreading joy. Our dream was simple: to bring smiles to faces with delicious, high-quality sweets.
                        Combining our skills and enthusiasm, we created Sweet Tooth Haven, a place where every candy is crafted with care. From gourmet chocolates to nostalgic retro treats, we aim to make every visit special.
                    </p>
                    <p>
                        Join us on this sweet journey and discover the magic of candy!
                    </p>
                    <p>
                        With love and candy, <br />
                        The Sweet Tooth Haven Team
                    </p>
                </section>
                <section className="home-buttons">
                    <button className="order-button" onClick={handleOrderClick}>Order</button>
                    <button className="candies-button" onClick={handleCandiesClick}>Check Out the Candy</button>
                </section>
            </main>
        </div>
    );
};

export default Home;
