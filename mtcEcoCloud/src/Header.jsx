import React from 'react';
import './css/Header.css';

const Header = ({ navItems = [] }) => {
  return (
    <header className="header">
      <div className="header__logo">МТС</div>

      <nav className="header__nav">
        {navItems.map((item, index) => (
          <a key={index} href="#" className="header__nav-link">{item}</a>
        ))}
      </nav>
      <div className="header__user">
        <span className="header__user-name">Егор С.</span>
        <span className="header__user-metric">Баланс</span>
        <span className="header__user-initials">0 р.</span>
      </div>
    </header>
  );
};

export default Header;