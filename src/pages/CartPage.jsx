import React, { useEffect, useState } from 'react';
import './CartPage.css';
import { useNavigate } from 'react-router-dom';

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [showBill, setShowBill] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  const getTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (id, delta) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id) {
        const newQuantity = item.quantity + delta;
        return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
const handleBuyNow = () => {
  const orderData = {
    items: cartItems,
    total: getTotalPrice(),
    user: 'guest', // or use logged-in user
  };

  fetch('http://localhost:5000/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Failed to place order');
      }
      return res.json();
    })
    .then((data) => {
      console.log('Order saved:', data);
      setShowBill(true); // Show bill after successful order
      localStorage.removeItem('cart'); // Clear cart
    })
    .catch((err) => {
      console.error('Order failed:', err);
      alert('Failed to place order. Try again.');
    });
};



  return (
    <div className="cart-container">
        <center><h1>🛒 Your Cart</h1></center>

      {/* If cart is empty and bill is not showing */}
      {cartItems.length === 0 && !showBill ? (
        <center><p>Your cart is empty.</p></center>
      ) : (
        <>
          {/* Show cart grid if bill not triggered */}
          {!showBill && (
            <>
              <div className="cart-grid">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item-box">
                 <div className="cart-item-info">
                      <h3>{item.name}</h3>
                      <p>Price: ₹{item.price}</p>
                      <div className="quantity-control">
                        <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                      </div>
                      <p>Total: ₹{item.price * item.quantity}</p>
                      <button className="pink-button" onClick={() => handleRemoveItem(item.id)}>
                        Remove
                      </button>

                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-actions">
                <h2 className="grand-total">Grand Total: ₹{getTotalPrice()}</h2>
                <button className="pink-button" onClick={handleBuyNow}>
                  Buy Now
                </button>


              </div>
            </>
          )}

          {showBill && (
  <div className="bill-wrapper">
    <div className="bill-container small">
      <h2 className="bill-heading">🧾 Puthiya Paarvai Invoice</h2>
      <hr />

      <table className="bill-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>₹{item.price}</td>
              <td>₹{item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="bill-total">
        <strong>Total Paid:</strong> ₹{getTotalPrice()}
      </div>

      <p className="thank-you">🎉 Thank you for shopping with Puthiya Paaravai</p>

      <button className="pink-button" onClick={() => navigate('/')}>
  Back to Shop
</button>

    </div>
  </div>
)}
        </>
      )}
    </div>
  );
}

export default CartPage;
