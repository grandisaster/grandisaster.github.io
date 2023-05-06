import bridge from '@vkontakte/vk-bridge';
import React from 'react';


const VKPost = () => {
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
            );
  }

const VKFriends = () => {
    bridge.send('VKWebAppGetFriends')
  .then((data) => { 
    if (data.users) {
      // Данные о пользователях получены
    }
  })
  .catch((error) => {
    // Ошибка
    console.log(error);
  });
}

const VKInvite = () => {
    bridge.send('VKWebAppShowInviteBox', {})
  .then((data) => { 
    if (data.requestKey) {
      // Приглашение отправлено
    }
  })
  .catch((error) => {
    // Ошибка
    console.log(error);
  });
}

export {VKPost, VKFriends, VKInvite}