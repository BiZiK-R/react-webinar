import React from 'react'
import Button from '../button'
import plural from 'plural-ru';
import './shopBasket.css';

function ShopBasket({onDisplay, totalPrice, totalCount}) {

    const totalCountString = `${totalCount} ${plural(totalCount, 'товар', 'товара', 'товаров')}`,
          totalPriceString = totalPrice.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');


    return (
        <div className="ShopBasket">
            <div className="ShopBasket__title">
                В корзине:
                <span className="ShopBasket__cartStatus">{ totalCount ? `${totalCountString} / ${totalPriceString} ₽` : 'пусто'}</span>
            </div>
            <Button onClick={onDisplay}>
                Перейти
            </Button>
        </div>
    )
}

export default React.memo(ShopBasket);