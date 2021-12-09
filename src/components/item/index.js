<<<<<<< HEAD
import React, {useCallback, useState} from "react";
import propTypes from 'prop-types';
import plural from 'plural-ru';
import Button from "../button";
import './styles.css';

function Item({item, onAddToCart}){

  return (
    <div className={'Item'  + (item.selected ? ' Item_selected' : '')} >
      <div className='Item__number'>{item.code}</div>
      <div className='Item__title'>
        {item.title}
      </div>
      <div className='Item__price'>
        {`${item.price.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')} ₽`}
      </div>
      <div className='Item__actions'>
        <Button onClick={() => onAddToCart(item)}>
          Добавить
        </Button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAddToCart: propTypes.func.isRequired
}

Item.defaultProps = {
  onAddToCart: () => {},
}

export default React.memo(Item);
=======
import React from 'react';
import propTypes from 'prop-types';
import './styles.css';
import numberFormat from "../../utils/number-format";

function Item({item, onAdd}) {

  return (
      <div className='Item'>
        <div className='Item__number'>{item._key}</div>
        <div className='Item__title'>{item.title}</div>
        <div className='Item__right'>
          <div className='Item__price'>{numberFormat(item.price)} ₽</div>
          <button onClick={(e) => {e.preventDefault(); onAdd(item._id);}}>Добавить</button>
        </div>
      </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func,
  onSelectProduct: propTypes.func,
}

Item.defaultProps = {
  onAdd: () => {},
  onSelectProduct: () => {}
}

export default React.memo(Item);
>>>>>>> lecture-3
