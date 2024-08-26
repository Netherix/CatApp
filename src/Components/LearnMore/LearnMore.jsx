import { useLocation, useNavigate } from 'react-router-dom';
import './LearnMore.css'

const LearnMore = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cat } = location.state || {}; // Extract cat data from location state

  if (!cat) {
    return <div>No cat information available</div>;
  }

  return (
    <div className="learn-more">
      <h1>{cat.name}</h1>
      <p>{cat.description}</p>
      <img
        src={`https://cdn2.thecatapi.com/images/${cat.reference_image_id}.jpg`}
        alt={cat.name}
        style={{ height: '300px', width: '300px' }}
      />
      <button onClick={() => navigate('/')}>Back to Home</button> {/* Button to navigate back */}
    </div>
  );
};

export default LearnMore;
