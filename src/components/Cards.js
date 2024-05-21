import React from 'react'
import CardItem from './CardItem'
import './Cards.css'

import img1 from '../assets/images/img-1.jpg'
import img2 from '../assets/images/img-2.jpg'

function Cards() {
  return (
    <div className="cards">
      <h1>Who will win the title?</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem
              src={img1}
              text="Can the Space Rangers bounce back from 22/23 season?"
              label="Article"
              path="/results"
            />
            <CardItem
              src={img2}
              text="MIA lose to Rangers in PK thriller!"
              label="News"
              path="/results"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards