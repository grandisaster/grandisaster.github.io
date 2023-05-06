import React from 'react';
import './menu.css';
import balanceIcon from '../icons/money.png'
import { bridge } from '@vkontakte/vk-bridge';

function PostVK () {
        console.log('post');
        bridge.send('VKWebAppShowWallPostBox', {
            message: 'Попробуй победить моих воинов в Infinite Chaos!',
            attachments: 'https://vk.com/app51635462_353345497'
            })
            .then((data) => { 
              if (data.post_id) {
                // Запись размещена
              }
            })
            .catch((error) => {
              // Ошибка
              console.log(error);}
                );}

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
        <button className="menu-button stats"> Статистика</button>
        <button className="menu-button invite" onClick={PostVK}>Пригласить друзей</button>
        <button className="menu-button bonus">Ежедневный бонус</button>
      </div>
    </div>
    </div>
  );
};

export default Menu;
