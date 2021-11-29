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