import React from 'react';
import ItemBasket from '../itemBasket';
import './listBasket.css';

function ListBasket({items}) {

    return(
        <div className='ListBasket'>{items.map(item =>
            <div className='ListBasket__item' key={item.code}>
              <ItemBasket item={item}/>
            </div>
          )}
        </div>
    )
}

export default React.memo(ListBasket);