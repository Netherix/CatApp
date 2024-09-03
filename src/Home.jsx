import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Search from './Components/Search/Search';
import Pagination from './Components/Pagination/Pagination';
import Sorting from './Components/Sorting/Sorting';
import Favorites from './Components/Favorites/Favorites';
import Button from './Components/Button/Button';
import './Home.css';

const Home = () => {
  const [catData, setCatData] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortAttribute, setSortAttribute] = useState('default');

  const navigate = useNavigate();
  const divRef = useRef();

  const catsPerPage = 10;
  const maxPages = Math.ceil(catData.length / catsPerPage);
  const lastCatIndex = catsPerPage * currentPage;
  const firstCatIndex = lastCatIndex - catsPerPage;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.thecatapi.com/v1/breeds');
        if (!response.ok) {
          throw new Error('Error: could not get response');
        }
        const data = await response.json();
        setCatData(data);
      } catch (error) {
        console.error('Error: ', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [sortAttribute]);

  const sortedCatData = [...catData].sort((a, b) => {
    if (sortAttribute === 'default') return 0;
    return b[sortAttribute] - a[sortAttribute];
  });

  const currentCatArray = sortedCatData.slice(firstCatIndex, lastCatIndex);

  const handleSortChange = (attribute) => {
    setSortAttribute(attribute);
  };

  const handleClick = (cat) => {
    if (selectedCat && selectedCat.id === cat.id) {
      setSelectedCat(null);
    } else {
      setSelectedCat(cat);
      if (divRef.current) {
        divRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleFavorites = (cat) => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.thecatapi.com/v1/images/${cat.reference_image_id}`);
        if (!response.ok) {
          throw new Error('Response failed');
        }
        const data = await response.json();
        setFavorites((prevFavorites) => [...prevFavorites, data]);
      } catch (error) {
        console.error('Error: ', error);
      }
    };
    if (favorites.some(favorite => favorite.id === cat.reference_image_id)) {
      console.log('This cat is already in your favorites!');
      return;
    }
    fetchData();
  };

  const handleRemoveFavorites = (image) => {
    const updatedFavorites = favorites.filter((favImage) => favImage.id !== image.id);
    setFavorites(updatedFavorites);
  };

  const handleLearnMore = (cat) => {
    navigate('/learn_more', { state: { cat } });
  };

  return (
    <div>

      <div className='title'>
        <h1>Delve Deep Into The Land Of Cute Cats!</h1>
        <img
          src='/images/cute_blue_kitty-removebg-preview.png'
        />
      </div>

      {/* Search Component */}
      <div className="search">
        <Search 
          catData={catData} 
          handleLearnMore={handleLearnMore}
        />
      </div>

      {/* Favorites Component */}
      <div className="favorites">
        <Favorites
          favorites={favorites}
          onRemoveFavorite={handleRemoveFavorites}
        />
      </div>

      {/* Selected Cat Section */}
      <div className={`selected-image-container ${selectedCat ? 'has-cat-selected' : ''}`} ref={divRef}>
        {selectedCat ? (
          <>
            <h3>Currently Selected Cat: {selectedCat.name}</h3>
            <img
              className="selected-image"
              src={`https://cdn2.thecatapi.com/images/${selectedCat.reference_image_id}.jpg`}
              alt={selectedCat.name}
            />
            <Button
              text="Add to Favorites"
              onClick={() => handleFavorites(selectedCat)}
            />
            <Button
              text="Learn More"
              onClick={() => handleLearnMore(selectedCat)}
            />
          </>
        ) : (
          <>
          </>
        )}
      </div>

      {/* Sorting Component */}
      <div className="sorting">
        <Sorting
          sortAttribute={sortAttribute}
          onSortChange={handleSortChange}
        />
      </div>

      {/* Cat Buttons */}
      <div className="select-a-cat">
        <h3>Select A Cat!</h3>
        {currentCatArray.map((cat) => (
          <div className="main-buttons" key={cat.id}>
            <Button
              text={cat.name}
              onClick={() => handleClick(cat)}
            />
          </div>    
      ))}
      </div>

      {/* Pagination Component */}
      <Pagination
        currentPage={currentPage}
        maxPages={maxPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Home;