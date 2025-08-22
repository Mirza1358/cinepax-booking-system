import React from 'react';
import './components/styles.css';
import './components/FoodAndDrinksStyles.css';

const FoodAndDrinks = () => {
  return (
    <div>
      <div className="hero">
        <h1>Curly Fries & Cold Drinks</h1>
      </div>

      <section className="menu-section container">
        <h2>Food & Drinks</h2>
        <div className="drinks row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
          <div className="col drink-item">
            <img src="images/fanta.jpeg" alt="Fanta" className="drink-image" />
            Fanta only on <span>RS.219 /-</span>
          </div>
          <div className="col drink-item">
            <img src="images/sprite.jpeg" alt="Sprite" className="drink-image" />
            Sprite only on <span>RS.219 /-</span>
          </div>
          <div className="col drink-item">
            <img src="images/dietcoke.webp" alt="Diet Coke" className="drink-image" />
            Diet Coke only on <span>RS.219 /-</span>
          </div>
          <div className="col drink-item">
            <img src="images/peach.jpeg" alt="Instant Peach" className="drink-image" />
            Instant Peach only on <span>RS.269 /-</span>
          </div>
        </div>

        <h2 className="mt-5">Snacks</h2>
        <div className="drinks row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
          <div className="col drink-item">
            <img src="images/popcorn.webp" alt="Popcorn" className="drink-image" />
            Popcorn only on <span>RS.399 /-</span>
          </div>
          <div className="col drink-item">
            <img src="images/fries.jpeg" alt="Fries" className="drink-image" />
            Curly Fries only on <span>RS.349 /-</span>
          </div>
          <div className="col drink-item">
            <img src="images/nachos.jpeg" alt="Nachos" className="drink-image" />
            Nachos only on <span>RS.449 /-</span>
          </div>
          <div className="col drink-item">
            <img src="images/hotdog.jpeg" alt="Hot Dog" className="drink-image" />
            Hot Dog only on <span>RS.399 /-</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FoodAndDrinks;