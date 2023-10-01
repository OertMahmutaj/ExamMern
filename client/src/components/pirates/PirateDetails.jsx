import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../styles/piratedetails.css';

const PirateDetails = () => {
  const { id } = useParams();
  const [pirate, setPirate] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/pirate/${id}`)
      .then((response) => {
        setPirate(response.data);
      })
      .catch((error) => {
        console.error('Error fetching pirate details:', error);
      });
  }, [id]);

  const updatePirateAttribute = (attribute, newValue) => {
    const updateData = { [attribute]: newValue };

    axios
      .patch(`http://localhost:8000/api/pirate/${id}`, updateData)
      .then((response) => {
        setPirate((prevPirate) => ({
          ...prevPirate,
          [attribute]: newValue,
        }));
      })
      .catch((error) => {
        console.error(`Error updating ${attribute}:`, error);
      });
  };

  return (
    <div>
      {pirate ? (
        <div>
          <nav className="nav">
            <Link to="/pirate/new" className="nav-link">
              Add Pirate
            </Link>
          </nav>
          <h2>{pirate.name}</h2>
          <p>Catchphrase: {pirate.catchPhrase}</p>
          <div>
            <h3>About</h3>
            <p>Position: {pirate.crewPosition}</p>
            <p>Treasures: {pirate.treasureChests}</p>
            <p>Peg Leg: {pirate.hasPegLeg ? 'Yes' : 'No'}</p>
            <button
              className={`toggle-button ${pirate.hasPegLeg ? 'green-button' : 'red-button'}`}
              onClick={() => updatePirateAttribute('hasPegLeg', !pirate.hasPegLeg)}
            >
              Toggle Peg Leg
            </button>
            <p>Eye Patch: {pirate.hasEyePatch ? 'Yes' : 'No'}</p>
            <button
              className={`toggle-button ${pirate.hasEyePatch ? 'green-button' : 'red-button'}`}
              onClick={() => updatePirateAttribute('hasEyePatch', !pirate.hasEyePatch)}
            >
              Toggle Eye Patch
            </button>
            <p>Hook Hand: {pirate.hasHookHand ? 'Yes' : 'No'}</p>
            <button
              className={`toggle-button ${pirate.hasHookHand ? 'green-button' : 'red-button'}`}
              onClick={() => updatePirateAttribute('hasHookHand', !pirate.hasHookHand)}
            >
              Toggle Hook Hand
            </button>
            {pirate.imageUrl && (
              <div>
                <img src={pirate.imageUrl} alt={pirate.name} />
              </div>
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PirateDetails;
