import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Header.css';
import EcoScore from './EcoScore';
import EcoContributions from './EcoContributions';


const Header = ({ navItems = [] }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();


  const [score, SetNewScore] = useState(0)

  // Закрытие дропдауна при клике вне
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = () => {
     
    navigate('/l');
  };

  return (
    <header className="header">
      <div className="header__logo"></div>
      

      <nav className="header__nav">
        {navItems.map((item, index) => (
          <a key={index} href={item.route} className="header__nav-link">{item.name}</a>
        ))}
      </nav>

      <div
        className="header__user"
        onClick={toggleDropdown}
        ref={dropdownRef}
      >

        
        <EcoScore>{score}</EcoScore>
       

        <span className="header__user-balance">0 р.</span>
        <span className="header__user-initials">ЕС</span>
        
        <button className="header__dropdown-item" onClick={handleLogout}>
          Выйти
        </button>
        
        {isDropdownOpen && (
          <div className="header__dropdown">
            <EcoContributions />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;