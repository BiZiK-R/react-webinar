import React from 'react';
import ItemBasket from '../item-basket';
import './listBasket.css';

function ListBasket({items}) {

    return(
        <ul className='ListBasket'>{items.map(item =>
            <li className='ListBasket__item' key={item.code}>
              <ItemBasket item={item}/>
            </li>
          )}
        </ul>
    )
}

export default React.memo(ListBasket);