import './menu.css';
import balanceIcon from '../icons/money.png'
import bridge from '@vkontakte/vk-bridge';
import { VKPost, VKFriends, VKInvite } from './VKInteract';
import { useState } from 'react';
import { Alert } from '@vkontakte/vkui';
import { useRef } from 'react';
import music_menu from '../music/menu_music.mp3';


const Menu = ({ onPlayButtonClick }) => {
  const [balance, setBalance] = useState(0);
  const [audio] = useState(new Audio(music_menu));
  const [isPlaying, setIsPlaying] = useState(false);

  function addBalance(amount) {
    setBalance(prevBalance => prevBalance + amount);
  }
 

  const handleToggleMusic = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  
  return (
    <div className='menu-background'>

    <div className="menu-container">

    <div className="balance-container">
    <div style={{ display: 'flex',  flexDirection: 'row' }}>
    <img src={balanceIcon} alt="balance" className="balance-icon" />
    <span className="balance-value"> {balance} </span>
    </div>
    <button style={{fontFamily: 'PressStart2P', backgroundColor:'red',cursor: 'pointer', color:'white', border: 'none', borderRadius: '5px', position:'relative', left:'8px', height:'3vh' }} onClick={handleToggleMusic}>
        {isPlaying ? 'Pause Music' : 'Play Music'}
      </button>
    
      </div>
   
    
      <h1 >Infinite Chaos</h1>
      
      <div className="button-container">
        <button className="menu-button play" onClick={onPlayButtonClick} >Играть</button>
        <button className="menu-button shop" >Магазин</button>
        <button className="menu-button friends" onClick={VKInvite}>Друзья</button>
        <button className="menu-button stats">Статистика</button>
        <button className="menu-button invite" onClick={VKPost}>Пригласить друзей</button>
        <button className="menu-button bonus" onClick={ () => {
          
          <Alert>Вы получили ежедневный бонус!</Alert>
          addBalance(100);

        }}>Ежедневный бонус</button>

      </div>

    </div>

    </div>
  );
};

export default Menu;
