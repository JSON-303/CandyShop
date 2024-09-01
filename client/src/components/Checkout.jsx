import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';

const CheckOut = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    const itemsFromState = state?.itemsOrdered || [];
    const totalAmountFromState = state?.totalAmount || 0;

    const [items, setItems] = useState(itemsFromState);
    const [totalAmount, setTotalAmount] = useState(totalAmountFromState);

    const handleQuantityChange = (id, change) => {
        setItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
            )
        );
    };
    useEffect(() => {
        const newTotal = items.reduce((acc, item) => acc + (item.quantity * item.pricePerLb), 0);
        setTotalAmount(newTotal.toFixed(2));
    }, [items]);

    const handleOrder = async () => {
        try {
            const orderDetails = {
                items: items.map(item => ({
                    id: item.id,
                    name: item.name,
                    quantity: item.quantity,
                    pricePerLb: item.pricePerLb
                })),
                totalAmount
            };

            const response = await fetch('/api/candyshop/placeorder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderDetails)
            });

            if (!response.ok) {
                throw new Error('Order failed');
            }

            setItems([]);
            setTotalAmount(0);

            navigate('/candyshop/candies');
        } catch (error) {
            console.error('Error placing order:', error);
        };

    };

    return (
        <div className="checkout-container-fluid">
            <header className="header d-flex justify-content-between bg-secondary-subtle rounded-bottom border-bottom border-dark">
                <div className="p-2 d-flex">
                    <h1 className="">Sweet Tooth Haven!</h1>
                </div>
                <nav className="ms-auto">
                    <button className="btn btn-success" onClick={() => navigate('/candyshop/home')}>HOME</button>
                    <button className="btn btn-success mx-2" onClick={() => navigate('/candyshop/candies')}>CANDIES</button>
                </nav>
            </header>
            <h1 className="checkout-form-title">Review Your Order</h1>
            <form className="checkout-form">
                {items.map(item => (
                    <div key={item.id} className="checkout-item">
                        <h3>{item.name}</h3>
                        <p>Price per lb: ${item.pricePerLb.toFixed(2)}</p>
                        <div className="quantity-controls">
                            <button type="button" onClick={() => handleQuantityChange(item.id, -1)} disabled={item.quantity <= 0}>-</button>
                            <input
                                type="number"
                                min="0"
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value, 10) - item.quantity)}
                            />
                            <button type="button" onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                        </div>
                        <p>Total: ${(item.quantity * item.pricePerLb).toFixed(2)}</p>
                    </div>
                ))}
            </form>
            <div className="checkout-total">
                <h2>Order Total: ${totalAmount}</h2>
            </div>
            <button className="order-button" onClick={handleOrder}>
                Place Order
            </button>
        </div>
    );
};

export default CheckOut;

