import React from 'react';
import { useNavigate } from 'react-router-dom';
import cartIcon from '../assets/cart-icon.png';
import '../App.css';
import pumpkinSpiceSuckers from '../assets/PumpkinSpiceSuckers.jpg';
import peppermintBarkSquares from '../assets/PeppermintBarkSquares.jpg';
import eggnogFlavoredHardCandies from '../assets/EggnogFlavoredHardCandies.jpg';
import fruitJawbreakers from '../assets/FruitJawbreakers.jpg';
import sourRainbowDrop from '../assets/SourRainbowDrop.jpg';
import peppermintDiscs from '../assets/PeppermintDiscs.jpg';
import butterscotchDiscs from '../assets/ButterscotchDiscs.jpg';
import cinnamonFireballs from '../assets/CinnamonFireballs.jpg';
import classicRockCandySticks from '../assets/ClassicRockCandySticks.jpg';
import rockCandyCrystals from '../assets/RockCandyCrystals.jpg';
import sparklingRockCandyCrystals from '../assets/SparklingRockCandyCrystals.jpg';
import saltedCaramelTrufflesone from '../assets/SaltedCaramelTrufflesone.jpg';
import matchaGreenTeaBarkone from '../assets/MatchaGreenTeaBarkone.jpg';
import raspberryRoseTrufflesone from '../assets/RaspberryRoseTrufflesone.jpg';
import espressoDelighBars from '../assets/EspressoDelightBars.jpg';

const candies = [
    { id: 'saltedCaramelTruffles', name: 'Salted Caramel Truffles', pricePerLb: 25.00, description: 'Creamy milk chocolate ganache with a smooth caramel center, finished with a hint of sea salt.', image: saltedCaramelTrufflesone },
    { id: 'matchaGreenTeaBark', name: 'Matcha Green Tea Bark', pricePerLb: 22.00, description: 'White chocolate bark with a vibrant matcha green tea coating, sprinkled with crushed almonds.', image: matchaGreenTeaBarkone },
    { id: 'raspberryRoseTruffles', name: 'Raspberry Rose Truffles', pricePerLb: 24.00, description: 'Delicate dark chocolate ganache infused with raspberry and a touch of rose essence.', image: raspberryRoseTrufflesone },
    { id: 'espressoDelightBars', name: 'Espresso Delight Bars', pricePerLb: 23.00, description: 'Rich milk chocolate with a robust espresso filling, perfect for coffee lovers.', image: espressoDelighBars },

    { id: 'fruitJawbreakers', name: 'Fruit Jawbreakers', pricePerLb: 12.00, description: 'Multi-layered jawbreakers in flavors like Strawberry-Banana, Green Apple, and Blueberry.', image: fruitJawbreakers },
    { id: 'sourRainbowDrops', name: 'Sour Rainbow Drops', pricePerLb: 14.00, description: 'Tangy, colorful hard candies with a burst of sour fruit flavors like Lemon, Lime, and Berry.', image: sourRainbowDrop },
    { id: 'peppermintDiscs', name: 'Peppermint Discs', pricePerLb: 10.00, description: 'Classic minty hard candies with a refreshing peppermint flavor.', image: peppermintDiscs },
    { id: 'butterscotchDiscs', name: 'Butterscotch Discs', pricePerLb: 13.00, description: 'Smooth, buttery hard candies with a rich, caramelized butterscotch flavor.', image: butterscotchDiscs },
    { id: 'cinnamonFireballs', name: 'Cinnamon Fireballs', pricePerLb: 11.00, description: 'Spicy, cinnamon-flavored hard candies that deliver a warm, fiery kick with every bite.', image: cinnamonFireballs },

    { id: 'classicRockCandySticks', name: 'Classic Rock Candy Sticks', pricePerLb: 16.00, description: 'Crystallized sugar sticks in vibrant colors and flavors like Blue Raspberry, Cherry, and Lemon Lime.', image: classicRockCandySticks },
    { id: 'rockCandyCrystals', name: 'Rock Candy Crystals', pricePerLb: 17.00, description: 'Assorted flavors like Cotton Candy, Grape, and Apple, perfect for snacking or adding a touch of sparkle to beverages.', image: rockCandyCrystals },
    { id: 'sparklingRockCandyCrystals', name: 'Sparkling Rock Candy Crystals', pricePerLb: 19.00, description: 'Iridescent, flavored crystals with unique flavors such as Watermelon Mint and Pineapple Mango.', image: sparklingRockCandyCrystals },

    { id: 'pumpkinSpice', name: 'Pumpkin Spice Suckers', pricePerLb: 15.00, description: 'Lollipop-style suckers with a warm, autumnal pumpkin spice flavor, perfect for fall.', image: pumpkinSpiceSuckers },
    { id: 'peppermintBark', name: 'Peppermint Bark Squares', pricePerLb: 20.00, description: 'Rich dark chocolate bark topped with crushed candy canes, ideal for holiday gifting.', image: peppermintBarkSquares },
    { id: 'eggnogHardCandies', name: 'Eggnog Flavored Hard Candies', pricePerLb: 18.00, description: 'Creamy and spiced hard candies capturing the festive essence of eggnog for winter celebrations.', image: eggnogFlavoredHardCandies },
];


const MenuPage = () => {
    const navigate = useNavigate();

    const handleDetails = (id) => {
        navigate(`/candyshop/candy/${id}`);
    };

    const handleOrderClick = () => {
        navigate('/candyshop/placeorder');
    };

    return (
        <div className="container">
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
            <main className="main-content">
                <h1 className="main-title"> SWEETS </h1>
                <ul className="list-group">
                    {candies.map(candy => (
                        <li key={candy.id} className="list-item">
                            <img
                                src={candy.image}
                                alt={candy.name}
                                className="me-3"
                                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                            />
                            <h2 className="candy-name">{candy.name}</h2>
                            <p className="candy-price">Price: ${candy.pricePerLb.toFixed(2)} per lb</p>
                            <button className="details-button" onClick={() => handleDetails(candy.id)}>Details</button>
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );
};

export default MenuPage;

