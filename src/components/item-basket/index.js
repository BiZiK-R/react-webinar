<<<<<<< HEAD
import React from "react";
import propTypes from 'prop-types';
import './itemBasket.css';

function ItemBasket({item}){
  //console.log('Item ' + item.title)
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
=======
import React from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/number-format";
import './styles.css';

function ItemBasket({item}) {
  return (
    <div className='ItemBasket'>
      <div className='ItemBasket__number'>{item._key}</div>
      <div className='ItemBasket__title'>{item.title}</div>
      <div className='ItemBasket__right'>
        <span className="ItemBasket__cell">{numberFormat(item.price || 0)} ₽</span>
        <span className="ItemBasket__cell">{numberFormat(item.amount || 0)} шт</span>
>>>>>>> lecture-3
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
}

<<<<<<< HEAD
export default ItemBasket;
=======
ItemBasket.defaultProps = {

}

export default React.memo(ItemBasket);
>>>>>>> lecture-3
