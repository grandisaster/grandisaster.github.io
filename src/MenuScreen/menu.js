import React from 'react';
import './menu.css';
import balanceIcon from '../icons/money.png'

const Menu = ({ onPlayButtonClick }) => {
    
    
  return (
    <div className='menu-background'>

    <div className="menu-container">

    <div className="balance-container">

    <img src={balanceIcon} alt="balance" className="balance-icon" />
    <span className="balance-value">0</span>
    </div>
      <h1 >Infinite Chaos</h1>
      <div className="button-container">
        <button className="menu-button play" onClick={onPlayButtonClick} >Играть</button>
            <button className="menu-button shop">Магазин</button>
        <button className="menu-button friends">Друзья</button>
        <button className="menu-button stats">Статистика</button>
        <button className="menu-button invite">Пригласить друзей</button>
        <button className="menu-button bonus">Ежедневный бонус</button>
      </div>
    </div>
    </div>
  );
};

export default Menu;
