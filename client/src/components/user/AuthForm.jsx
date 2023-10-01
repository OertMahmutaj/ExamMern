import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/authform.css';

const AuthForm = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [loginErrors, setLoginErrors] = useState([]);
  const [registerErrors, setRegisterErrors] = useState([]);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:8000/api/user/login', loginData)
      .then((response) => {
        console.log(response.data);
        setLoginData({ email: '', password: '' });
        setLoginErrors([]);

        axios.get('http://localhost:8000/api/pirates')
          .then(() => {
            navigate('/pirates');
          })
          .catch(() => {
            navigate('/pirate/new');
          });
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.error) {
          setLoginErrors([error.response.data.error]);
        } else {
          console.error(error);
        }
      });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:8000/api/user/register', registerData)
      .then(() => {
        console.log('Registration successful');
        setRegisterData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        setRegisterErrors([]);

        toast.success('Registration successful. Please log in to continue.', {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.error) {
          setRegisterErrors([error.response.data.error]);
        } else {
          console.error(error);
        }
      });
  };

    return (
        <div>
            <h1>Welcome To Pirate Crew</h1>
            <div>
                <h1>Login</h1>
                <form onSubmit={handleLoginSubmit}>
                    {loginErrors.length > 0 && (
                        <div className="error-message">
                            {loginErrors.map((error, index) => (
                                <p key={index}>{error}</p>
                            ))}
                        </div>
                    )}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={loginData.email}
                        onChange={handleLoginChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={loginData.password}
                        onChange={handleLoginChange}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
            </div>

            <div>
                <h1>Register</h1>
                <form onSubmit={handleRegisterSubmit}>
                    {registerErrors.length > 0 && (
                        <div className="error-message">
                            {registerErrors.map((error, index) => (
                                <p key={index}>{error}</p>
                            ))}
                        </div>
                    )}
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={registerData.firstName}
                        onChange={handleRegisterChange}
                        required
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={registerData.lastName}
                        onChange={handleRegisterChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={registerData.email}
                        onChange={handleRegisterChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={registerData.password}
                        onChange={handleRegisterChange}
                        required
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={registerData.confirmPassword}
                        onChange={handleRegisterChange}
                        required
                    />
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};

export default AuthForm;
