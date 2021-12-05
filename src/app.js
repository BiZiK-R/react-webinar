import React, {useCallback, useState} from 'react';
import ListShop from "./components/list-shop";
import Layout from "./components/layout";
import ShopBasket from './components/shop-basket';
import ShopBasketModal from './components/shop-basket-modal';

/**
 * Приложение
 * @param store {Store} Состояние с действиями
 */
function App({store}) {

  const [displayBasket, setDisplayBasket] = useState(false);

  const callbacks = {
    onAddToCart: useCallback((item) => store.addItemToCart(item), [store])
  }

  return (
    <>
      {displayBasket && (
        <ShopBasketModal 
          items={store.getState().cart.products} 
          totalPrice={store.getState().cart.totalPrice} 
          totalCount={store.getState().cart.totalCount} 
          onDisplay={() => setDisplayBasket(false)}
        />
      )}
      <Layout theme="shop" head={<h1>Магазин</h1>}>
        <ShopBasket onDisplay={() => setDisplayBasket(true)} totalPrice={store.getState().cart.totalPrice} totalCount={store.getState().cart.totalCount} />
        <ListShop items={store.getState().items}
              onAddToCart={callbacks.onAddToCart}  
        />
      </Layout>
    </>
  );
}

export default App;