import React from "react";
import propTypes from 'prop-types';
import './itemBasket.css';

function ItemBasket({item}){
  return (
    <div className={'ItemBasket'}>
      <div className='ItemBasket__number'>{item.code}</div>
      <div className='ItemBasket__title'>
        {item.title}
      </div>
      <div className='ItemBasket__info'>
        <div className='ItemBasket__price'>
          {`${item.price.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')} ₽`}
        </div>
        <div className='ItemBasket__quantity'>
          {`${item.count} шт.`}
        </div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
}

export default ItemBasket;
