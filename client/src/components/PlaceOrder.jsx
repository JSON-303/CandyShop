import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cartIcon from '../assets/cart-icon.png';

const candies = [
    { id: 'pumpkinSpice', name: 'Pumpkin Spice Suckers', pricePerLb: 15.00, description: 'Lollipop-style suckers with a warm, autumnal pumpkin spice flavor, perfect for fall.' },
    { id: 'peppermintBark', name: 'Peppermint Bark Squares', pricePerLb: 20.00, description: 'Rich dark chocolate bark topped with crushed candy canes, ideal for holiday gifting.' },
    { id: 'eggnogHardCandies', name: 'Eggnog Flavored Hard Candies', pricePerLb: 18.00, description: 'Creamy and spiced hard candies capturing the festive essence of eggnog for winter celebrations.' },
    { id: 'fruitJawbreakers', name: 'Fruit Jawbreakers', pricePerLb: 12.00, description: 'Multi-layered jawbreakers in flavors like Strawberry-Banana, Green Apple, and Blueberry.' },
    { id: 'sourRainbowDrops', name: 'Sour Rainbow Drops', pricePerLb: 14.00, description: 'Tangy, colorful hard candies with a burst of sour fruit flavors like Lemon, Lime, and Berry.' },
    { id: 'peppermintDiscs', name: 'Peppermint Discs', pricePerLb: 10.00, description: 'Classic minty hard candies with a refreshing peppermint flavor.' },
    { id: 'butterscotchDiscs', name: 'Butterscotch Discs', pricePerLb: 13.00, description: 'Smooth, buttery hard candies with a rich, caramelized butterscotch flavor.' },
    { id: 'cinnamonFireballs', name: 'Cinnamon Fireballs', pricePerLb: 11.00, description: 'Spicy, cinnamon-flavored hard candies that deliver a warm, fiery kick with every bite.' },
    { id: 'classicRockCandySticks', name: 'Classic Rock Candy Sticks', pricePerLb: 16.00, description: 'Crystallized sugar sticks in vibrant colors and flavors like Blue Raspberry, Cherry, and Lemon Lime.' },
    { id: 'rockCandyCrystals', name: 'Rock Candy Crystals', pricePerLb: 17.00, description: 'Assorted flavors like Cotton Candy, Grape, and Apple, perfect for snacking or adding a touch of sparkle to beverages.' },
    { id: 'sparklingRockCandyCrystals', name: 'Sparkling Rock Candy Crystals', pricePerLb: 19.00, description: 'Iridescent, flavored crystals with unique flavors such as Watermelon Mint and Pineapple Mango.' },
    { id: 'saltedCaramelTruffles', name: 'Salted Caramel Truffles', pricePerLb: 25.00, description: 'Creamy milk chocolate ganache with a smooth caramel center, finished with a hint of sea salt.' },
    { id: 'matchaGreenTeaBark', name: 'Matcha Green Tea Bark', pricePerLb: 22.00, description: 'White chocolate bark with a vibrant matcha green tea coating, sprinkled with crushed almonds.' },
    { id: 'raspberryRoseTruffles', name: 'Raspberry Rose Truffles', pricePerLb: 24.00, description: 'Delicate dark chocolate ganache infused with raspberry and a touch of rose essence.' },
    { id: 'espressoDelightBars', name: 'Espresso Delight Bars', pricePerLb: 23.00, description: 'Rich milk chocolate with a robust espresso filling, perfect for coffee lovers.' }
];

const PlaceOrder = () => {
    const [quantities, setQuantities] = useState(
        candies.reduce((acc, candy) => ({ ...acc, [candy.id]: 0 }), {})
    );
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        let newTotal = 0;
        candies.forEach(candy => {
            if (quantities[candy.id] > 0) {
                newTotal += quantities[candy.id] * candy.pricePerLb;
            }
        });
        setTotal(newTotal);
    }, [quantities]);

    const handleCheckboxChange = (id) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [id]: prevQuantities[id] > 0 ? 0 : 1
        }));
    };

    const handleQuantityChange = (id, e) => {
        const value = parseFloat(e.target.value);
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [id]: isNaN(value) ? 0 : Math.round(value)
        }));
    }

    const calculateTotal = () => {
        return candies.reduce((total, candy) => {
            return total + (quantities[candy.id] * candy.pricePerLb);
        }, 0).toFixed(2);
    };

    const handleCheckout = () => {
        const itemsOrdered = candies
            .filter(candy => quantities[candy.id] > 0)
            .map(candy => ({
                name: candy.name,
                quantity: quantities[candy.id],
                pricePerLb: candy.pricePerLb,
                total: (quantities[candy.id] * candy.pricePerLb).toFixed(2)
            }));
        const totalAmount = calculateTotal();
        navigate('/candyshop/checkout', { state: { itemsOrdered, totalAmount } });
    };

    return (
        <div className="order-container">
            <>
            <header className="header d-flex justify-content-between bg-secondary-subtle rounded-bottom border-bottom border-dark">
                <div className="p-2 d-flex">
                    <h1 className="">Sweet Tooth Haven!</h1>
                </div>
                <nav className="ms-auto">
                    <button className="btn btn-success" onClick={() => navigate('/candyshop/home')}>HOME</button>
                    <button className="btn btn-success mx-2" onClick={() => navigate('/candyshop/candies')}>CANDIES</button>
                    <button className="btn btn-success" onClick={() => navigate('/candyshop/recipes')}>RECIPES</button>
                    <img
                        src={cartIcon}
                        alt="Cart"
                        className="cart-icon"
                        onClick={() => navigate('/candyshop/checkout')}
                    />
                </nav>
            </header>
            <h1>Place Your Order Here</h1>
            <form className="order-form">
                {candies.map(candy => (
                    <div key={candy.id} className="candy-item">
                        <label>
                            <input
                                type="checkbox"
                                checked={quantities[candy.id] > 0}
                                onChange={() => handleCheckboxChange(candy.id)}
                                className="checkBoxStyle"
                            />
                            {candy.name} - ${candy.pricePerLb.toFixed(2)} per lb
                        </label>
                        <input
                            type="number"
                            min="0"
                            step="1"
                            value={quantities[candy.id] || ''}
                            onChange={(e) => handleQuantityChange(candy.id, e)}
                            disabled={quantities[candy.id] === 0}
                        />
                    </div>
                ))}
            </form>
            <div className="total">
                <h2>Total: ${calculateTotal()}</h2>
            </div>
            <button className="checkout-button" onClick={handleCheckout}>
                Checkout
            </button>
            </>
        </div>
    );
};

export default PlaceOrder;
