import React, { useState } from 'react';
import "../navbar.css";
import SignupForm from "./signup";
import SigninForm from "./signin";

import AddCarForm from "./addcar"

const Navbar = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [showSignin, setShowSignin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAddCar, setShowAddCar] = useState(false);

  const handleSignupClick = () => {
    setShowSignup(true);
    setShowSignin(false);
  };

  const handleSigninClick = () => {
    setShowSignup(false);
    setShowSignin(true);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setShowSignup(false);
    setShowSignin(false);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowSignup(false);
    setShowSignin(false);

  };

  const handleAddCarClick = () => {
    setShowAddCar((prevState) => !prevState);
    setShowSignup(false);
    setShowSignin(false);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar__logo">BuyCars</div>
        <div className="navbar__buttons">
          {!isLoggedIn && (
            <button onClick={handleSignupClick} className="navbar__button">
              Sign Up
            </button>
          )}
          {!isLoggedIn && (
            <button onClick={handleSigninClick} className="navbar__button">
              Log In
            </button>
          )}
          {isLoggedIn && (
            <button onClick={handleLogout} className="navbar__button">
              Log Out
            </button>
          )}
          {isLoggedIn && (
            <button onClick={handleAddCarClick} className="navbar__button">
              Add Car
            </button>
          )}
        </div>
      </nav>
      <div className="navbar__content">
        {showSignup && (
          <div>

            <SignupForm />
          </div>
        )}
        {showSignin && (
          <div>

            <SigninForm onLoginSuccess={handleLoginSuccess} />
          </div>
        )}
        {isLoggedIn && showAddCar && (
          <div>
            <AddCarForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
