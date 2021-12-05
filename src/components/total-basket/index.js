import React from 'react';
import './totalBasket.css'

function TotalBasket({totalCount, totalPrice}) {

    return (
        <div className="TotalBasket">
            <div className="TotalBasket__total"><span>Итого</span>
            {totalPrice.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')} ₽</div>
            <div className="TotalBasket__count">{totalCount} шт</div>
        </div>
    )
}

export default TotalBasket;