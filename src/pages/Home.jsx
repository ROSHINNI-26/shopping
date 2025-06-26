// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../App.css';

// function Home() {
//   const navigate = useNavigate();
//   const [search, setSearch] = useState('');
//   const [email, setEmail] = useState('');
//   const [userName, setUserName] = useState('');

//   const handleSearch = () => {
//     if (search.trim()) {
//       navigate(`/products?search=${search}`);
//     }
//   };

//   const handleSubscribe = () => {
//     if (email.trim()) {
//       const nameFromEmail = email.split('@')[0];
//       const formattedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
//       setUserName(formattedName);
//       setEmail('');
//     }
//   };

//   return (
//     <div className="home">
//       {/* Top-right greeting */}
//       {userName && (
//         <div className="user-greeting">
//           👋 Welcome, {userName}!
//         </div>
//       )}

//       <section className="hero">
//         <h1><span>Step Into Style with StylishWear</span></h1>
//         <p>Discover trendy outfits, exclusive deals, and fashion made for you!</p>

//         <div className="search-bar">
//           <input
//             type="text"
//             placeholder="Search for T-Shirts, Shoes, Jeans..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//           <button onClick={handleSearch}>Search</button>
//         </div>

//         <button onClick={() => navigate('/products')}>Shop Now</button>
//       </section>

//       <section className="features">
//         <div className="feature-card">
//           <h3>🧥 Premium Quality</h3>
//           <p>Only the best materials and brands, just for you.</p>
//         </div>
//         <div className="feature-card">
//           <h3>🚚 Fast Delivery</h3>
//           <p>Get your style delivered at lightning speed.</p>
//         </div>
//         <div className="feature-card">
//           <h3>💬 24/7 Support</h3>
//           <p>Our team is here anytime you need us.</p>
//         </div>
//       </section>

//       <section className="newsletter">
//         <h3>Subscribe for Exclusive Offers 🎁</h3>
//         <input
//           type="email"
//           placeholder="Enter your email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <button onClick={handleSubscribe}>Subscribe</button>
//       </section>
//     </div>
//   );
// }

// export default Home;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../App.css';

// function Home() {
//   const navigate = useNavigate();
//   const [search, setSearch] = useState('');
//   const [email, setEmail] = useState('');
//   const [userName, setUserName] = useState('');

//   const handleSearch = () => {
//     if (search.trim()) {
//       navigate(`/products?search=${search}`);
//     }
//   };

//   const handleSubscribe = () => {
//     if (email.trim() && email.includes('@')) {
//       const extractedName = email.split('@')[0];
//       const capitalized = extractedName.charAt(0).toUpperCase() + extractedName.slice(1);
//       setUserName(capitalized);
//       setEmail('');
//     } else {
//       alert('Please enter a valid email address.');
//     }
//   };

//   return (
//     <div className="home">
//       {/* ✅ TOP RIGHT GREETING */}
//       {userName && (
//         <div className="user-greeting">
//           👋 Welcome, {userName}!
//         </div>
//       )}

//       <section className="hero">
//         <h1>Step Into<span> <i>Puthiya Paarvai</i></span></h1>
//         <p>Discover trendy outfits, exclusive deals, and fashion made for you!</p>

//         <div className="search-bar">
//           <input
//             type="text"
//             placeholder="Search for T-Shirts, Shoes, Jeans..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//           <button onClick={handleSearch}>Search</button>
//         </div>

//         <button onClick={() => navigate('/products')}>Shop Now</button>
//       </section>

//       <section className="features">
//         <div className="feature-card">
//           <h3>🧥 Premium Quality</h3>
//           <p>Only the best materials and brands, just for you.</p>
//         </div>
//         <div className="feature-card">
//           <h3>🚚 Fast Delivery</h3>
//           <p>Get your style delivered at lightning speed.</p>
//         </div>
//         <div className="feature-card">
//           <h3>💬 24/7 Support</h3>
//           <p>Our team is here anytime you need us.</p>
//         </div>
//       </section>

//       <section className="newsletter">
//         <h3>Subscribe for Exclusive Offers 🎁</h3>
//         <input
//           type="email"
//           placeholder="Enter your email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <button onClick={handleSubscribe}>Subscribe</button>
//       </section>
//     </div>
//   );
// }

// export default Home;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [userName, setUserName] = useState('');

  // ✅ Load logged-in user's name on mount
  useEffect(() => {
    const storedLoginName = localStorage.getItem('loggedInUser');
    if (storedLoginName) {
      setUserName(storedLoginName);
    }
  }, []);

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/products?search=${search}`);
    }
  };

  return (
    <div className="home">
      {/* ✅ Greeting message (from login only) */}
      {userName && (
        <div className="user-greeting">
          👋 Welcome, {userName}!
        </div>
      )}

      <section className="hero">
        <h1>Step Into<span> <i>Puthiya Paarvai</i></span></h1>
        <p>Discover trendy outfits, exclusive deals, and fashion made for you!</p>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for T-Shirts, Shoes, Jeans..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        <button onClick={() => navigate('/products')}>Shop Now</button>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>🧥 Premium Quality</h3>
          <p>Only the best materials and brands, just for you.</p>
        </div>
        <div className="feature-card">
          <h3>🚚 Fast Delivery</h3>
          <p>Get your style delivered at lightning speed.</p>
        </div>
        <div className="feature-card">
          <h3>💬 24/7 Support</h3>
          <p>Our team is here anytime you need us.</p>
        </div>
      </section>
      <footer className="footer">
  <div className="footer-content">
    <h3>Puthiya Paarvai - Trendy Fashion Store</h3>
    <p>
      Your one-stop destination for stylish, affordable, and high-quality clothing for men, women, and kids.
      We bring the best of tradition and modern fashion together in every outfit.
    </p>
    <p>📞 Phone: <a href="tel:+919876543210">+91 98765 43210</a></p>
    <p>📧 Email: <a href="mailto:support@puthiyapaarvai.com">support@puthiyapaarvai.com</a></p>
    <p>📍 Location: Chennai, Tamil Nadu</p>
  </div>
</footer>

    </div>
  );
}

export default Home;
