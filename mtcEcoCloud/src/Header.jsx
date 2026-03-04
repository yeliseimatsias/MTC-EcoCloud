import React, { useState, useRef, useEffect } from 'react';
import './css/Header.css';

const Header = ({ navItems = [] }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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
    console.log('Выход из системы');
    // Здесь можно вызвать функцию выхода (очистка токена, редирект)
    setIsDropdownOpen(false);
  };

  return (
    <header className="header">
      <div className="header__logo">МТС</div>

      <nav className="header__nav">
        {navItems.map((item, index) => (
          <a key={index} href="#" className="header__nav-link">{item}</a>
        ))}
      </nav>

      <div
        className="header__user"
        onClick={toggleDropdown}
        ref={dropdownRef}
      >
        <span className="header__user-name">Егор С.</span>
        <span className="header__user-balance">0 р.</span>
        <span className="header__user-initials">ЕС</span>

        {isDropdownOpen && (
          <div className="header__dropdown">
            <button className="header__dropdown-item" onClick={handleLogout}>
              Выйти
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;