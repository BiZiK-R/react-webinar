import React from "react";
import propTypes from 'prop-types';
import Item from "../item";
import './styles.css';

function ListShop({items, onAddToCart}){
  return (
    <ul className='ListShop'>{items.map(item =>
      <li className='ListShop__item' key={item.code}>
        <Item item={item} onAddToCart={onAddToCart}/>
      </li>
    )}
    </ul>
  )
}

ListShop.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onSelectItem: propTypes.func,
  onDeleteItem: propTypes.func
}

ListShop.defaultProps = {
  items: [],
  onAddToCart: () => {},
}

export default React.memo(ListShop);