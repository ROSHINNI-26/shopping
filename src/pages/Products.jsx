// import React from 'react';
// import './Products.css';
// import { useNavigate } from 'react-router-dom';

// const allProducts = [
//   { id: 1, name: 'T-Shirt', price: 499, image: '/images/tshirt.jpg', category: 'Men'},
//   { id: 2, name: 'Jeans', price: 899, image: '/images/jeans.jpg', category: 'Men'},
//   { id: 3, name: 'Hoodie', price: 1299, image: '/images/hoodie.jpg', category: 'Men'},
//   { id: 4, name: 'Jacket', price: 1599, image: '/images/jacket.jpg', category: 'Men' },
//   { id: 5, name: 'Belt', price: 1599, image: '/images/belt.jpg', category: 'Men' },
//   { id: 6, name: 'Shirt', price: 1599, image: '/images/shirt.jpg', category: 'Men' },
//   { id: 7, name: 'Kurti', price: 1999, image: '/images/kurti.jpg', category: 'Women'},
//   { id: 8, name: 'Salwar', price: 799, image: '/images/salwar.jpg', category: 'Women'},
//   { id: 9, name: 'Saree', price: 1099, image: '/images/saree.jpg', category: 'Women'},
//   { id: 10, name: 'Croptop', price: 399, image: '/images/crop.jpg', category: 'Women'},
//   { id: 11, name: 'Choli', price: 1099, image: '/images/choli.jpg', category: 'Women'},
//   { id: 12,name: 'Leganga', price: 399, image: '/images/legenga.jpg', category: 'Women'},
//   { id: 13, name: 'CoupleDress', price: 499, image: '/images/setdress.jpg', category: 'Women'},
//   { id: 14, name: 'KidsWear', price: 299, image: '/images/kidswear.jpg', category: 'Kids' },
//   { id: 15, name: 'Sweater', price: 2499, image: '/images/sweater.jpg', category: 'Men' },
//   { id: 16, name: 'BabyWear', price: 699, image: '/images/babywear.jpg', category: 'Kids'},
//   { id: 17, name: 'KidsVeshti', price: 899, image: '/images/veshti.jpg', category: 'Kids'},
//   { id: 18, name: 'KidsKurta', price: 999, image: '/images/kidskurta.jpg', category: 'Kids'},
//   { id: 19, name: 'KidsJeans', price: 799, image: '/images/kidsjeans.jpg', category: 'Kids' },
//   { id: 20, name: 'PattuPaavadai', price: 999, image: '/images/pattu.jpg', category: 'Kids'},
//   { id: 21, name: 'Cap', price: 799, image: '/images/cap.jpg', category: 'Kids' },
// ];

// function Products() {
//   const navigate = useNavigate();

//   const handleAddToCart = (product) => {
//     const cart = JSON.parse(localStorage.getItem('cart')) || [];
//     const existingProductIndex = cart.findIndex(item => item.id === product.id);
//     if (existingProductIndex >= 0) {
//       cart[existingProductIndex].quantity = (cart[existingProductIndex].quantity || 1) + 1;
//     } else {
//       cart.push({ ...product, quantity: 1 });
//     }
//     localStorage.setItem('cart', JSON.stringify(cart));
//     navigate('/cart');
//   };
  

//   const renderCategoryRow = (category) => {
//     const categoryProducts = allProducts.filter((p) => p.category === category);
//     return (
//       <div className="category-section" key={category}>
//         <h2 className="category-title">{category} Collection</h2>
//         <div className="product-row">
//           {categoryProducts.map((product) => (
//             <div className="product-card" key={product.id}>
//               <img src={product.image} alt={product.name} />
//               <h4>{product.name}</h4>
//               <p>₹{product.price}</p>
//               <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="product-page">
//       <h1 className="main-heading">🛍️ Welcome to Puthiya Paarvai</h1>
//       {['Men', 'Women', 'Kids'].map(renderCategoryRow)}
//     </div>
//   );
// }

// export default Products;


// src/components/Products.jsx
import React, { useEffect, useState } from 'react';
import './Products.css';
import { useNavigate } from 'react-router-dom';

function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/products') // Uses Vite proxy to talk to backend
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Failed to fetch products:', err));
  }, []);

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingIndex = cart.findIndex((item) => item._id === product._id);

    if (existingIndex >= 0) {
      cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/cart');
  };

  const renderCategoryRow = (category) => {
    const filtered = products.filter((p) => p.category === category);
    return (
      <div className="category-section" key={category}>
        <h2 className="category-title">{category} Collection</h2>
        <div className="product-row">
          {filtered.map((product) => (
            <div className="product-card" key={product._id}>
              <img src={product.image} alt={product.name} />
              <h4>{product.name}</h4>
              <p>₹{product.price}</p>
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="product-page">
      <h1 className="main-heading">🛍️ Welcome to Puthiya Paarvai</h1>
      {['Men', 'Women', 'Kids'].map(renderCategoryRow)}
    </div>
  );
}

export default Products;
