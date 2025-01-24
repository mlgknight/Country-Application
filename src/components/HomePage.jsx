import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate('/search');
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Welcome to the Country App</h1>
      <p>Explore the countries around the world!</p>
      <button className='homePage-button'
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
        onClick={handleSearchClick}
      >
        Go to Search
      </button>
    </div>
  );
};

export default HomePage;
