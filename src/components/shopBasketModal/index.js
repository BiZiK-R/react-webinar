import React from 'react';
import cn from 'classnames';
import Layout from "../layout";
import Button from '../button';
import './shopBasketModal.css';
import ListBasket from '../listBasket';
import TotalBasket from '../totalBasket';

function ShopBasketModal({display, onDisplay, items, totalCount, totalPrice}) {

    return (
        <div className="ShopBasketModalOwerflow">
            <div className={cn("ShopBasketModal", display ? '' : 'ShopBasketModal__displayNone')}>
                <Layout head={<div className="ShopBasketModal__header">
                        <h1>Корзина</h1>
                        <Button theme="basketHead" onClick={onDisplay} >Закрыть</Button>
                    </div>}
                >
                    <ListBasket items={items} />
                    <TotalBasket totalCount={totalCount} totalPrice={totalPrice} />
                </Layout>
            </div>
        </div>
    )
}

export default ShopBasketModal;