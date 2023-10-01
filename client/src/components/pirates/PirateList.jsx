import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const PirateList = () => {
  const navigate = useNavigate();
  const [pirates, setPirates] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/pirates')
      .then((response) => {
        const sortedPirates = response.data.sort((a, b) => a.name.localeCompare(b.name));
        setPirates(sortedPirates);
      })
      .catch((error) => {
        console.error('Error fetching pirates:', error);
      });
  }, []);

  const handleViewClick = (pirateId) => {
    navigate(`/pirate/${pirateId}`);
  };

  const handleDeleteClick = (pirateId) => {
    axios.delete(`http://localhost:8000/api/pirate/${pirateId}`)
      .then(() => {

        setPirates((prevPirates) => prevPirates.filter((pirate) => pirate._id !== pirateId));
      })
      .catch((error) => {
        console.error('Error deleting pirate:', error);
      });
  };

  return (
    <div>
      <nav className="nav">

        <Link to="/pirate/new" className="nav-link">Add Pirate</Link>
      </nav>
      <h2>Pirate Crew</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Crew Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pirates.map((pirate) => (
            <tr key={pirate._id}>
              <td>{pirate.name}</td>
              <td>{pirate.crewPosition}</td>
              <td>
                <button onClick={() => handleViewClick(pirate._id)}>View</button>
                <button onClick={() => handleDeleteClick(pirate._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PirateList;
