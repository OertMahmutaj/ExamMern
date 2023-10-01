import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../styles/pirateform.css';

const PlayerForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        imageUrl: '',
        treasureChests: 0,
        catchPhrase: '',
        crewPosition: 'First Mate',
        hasPegLeg: false,
        hasEyePatch: false,
        hasPowderMonkey: false,
    });

    const [errors, setErrors] = useState([]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;


        const newValue = type === 'checkbox' ? checked : value;

        setFormData({ ...formData, [name]: newValue });
    };

    const handleTreasureChestsChange = (action) => {

        if (action === 'increase') {
            setFormData({ ...formData, treasureChests: formData.treasureChests + 1 });
        } else if (action === 'decrease' && formData.treasureChests > 0) {
            setFormData({ ...formData, treasureChests: formData.treasureChests - 1 });
        }
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();

        axios
            .post('http://localhost:8000/api/pirate/new', formData)
            .then((res) => {
                console.log(res.data);
                setErrors([]);
                navigate('/pirates')

            })
            .catch((err) => {
                if (err.response && err.response.data && err.response.data.error) {
                    setErrors([err.response.data.error]);
                } else {
                    console.log(err);
                }
            });
    };

    return (
        <div className="form-container">
            <nav className="nav">

                <Link to="/pirates" className="nav-link">Crew Board</Link>
            </nav>
            <form onSubmit={onSubmitHandler}>
                {errors.length > 0 && (
                    <div className="error-message">
                        {errors.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}
                <label className="form-label">Pirate Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <label className="form-label">Image URL:</label>
                <input
                    type="text"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    required
                />
                <label className="form-label">Treasure Chests:</label>
                <div className="treasure-input">
                    {/* <button
                        type="button"
                        onClick={() => handleTreasureChestsChange('decrease')}
                    >
                        -
                    </button> */}
                    <input
                        type="number"
                        name="treasureChests"
                        value={formData.treasureChests}
                        onChange={handleChange}
                        required
                    />
                    {/* <button
                        type="button"
                        onClick={() => handleTreasureChestsChange('increase')}
                    >
                        +
                    </button> */}
                </div>
                <label className="form-label">Catch Phrase:</label>
                <input
                    type="text"
                    name="catchPhrase"
                    value={formData.catchPhrase}
                    onChange={handleChange}
                    required
                />
                <label className="form-label">Crew Position:</label>
                <select
                    name="crewPosition"
                    value={formData.crewPosition}
                    onChange={handleChange}
                    required
                >
                    <option value="First Mate">First Mate</option>
                    <option value="Quarter Master">Quarter Master</option>
                    <option value="Boatswain">Boatswain</option>
                    <option value="Powder Monkey">Powder Monkey</option>
                    <option value="Captain">Captain</option>
                </select>
                <div className="checkboxes">
                    <label>
                        <input
                            type="checkbox"
                            name="hasPegLeg"
                            checked={formData.hasPegLeg}
                            onChange={handleChange}
                        />
                        Peg Leg
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hasEyePatch"
                            checked={formData.hasEyePatch}
                            onChange={handleChange}
                        />
                        Eye Patch
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="hasPowderMonkey"
                            checked={formData.hasPowderMonkey}
                            onChange={handleChange}
                        />
                        Powder Monkey
                    </label>
                </div>
                <button type="submit" className="form-button">
                    Add Pirate
                </button>
            </form>
        </div>
    );
};

export default PlayerForm;
