import useState from 'react';

const Shop = () => { 
  // Создаем состояния, чтобы хранить информацию о покупках
  const [purchased1, setPurchased1] = useState(false);
  const [purchased2, setPurchased2] = useState(false);

  // Обработчик нажатия кнопки покупки
  const handlePurchase = (index) => {
    if (index === 1) {
        setPurchased1(true);
    } else if (index === 2) {
      setPurchased2(true);
    }
  };

  return (
    <div>
      <h1>Магазин</h1>
      <div>
        <div>
          <img src="character1.jpg" alt="Персонаж 1" />
          {purchased1 ? (
            <button disabled>Куплено</button>
          ) : (
            <button onClick={() => handlePurchase(1)}>Купить</button>
          )}
        </div>
        <div >
          <img src="character2.jpg" alt="Персонаж 2" />
          {purchased2 ? (
            <button disabled>Куплено</button>
          ) : (
            <button onClick={() => handlePurchase(2)}>Купить</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
