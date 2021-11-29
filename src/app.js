import React, {useCallback, useState} from 'react';
import ListShop from "./components/listShop";
import Layout from "./components/layout";
import ShopBasket from './components/shopBasket';
import ShopBasketModal from './components/shopBasketModal';

/**
 * Приложение
 * @param store {Store} Состояние с действиями
 */
function App({store}) {

  const [displayBasket, setDisplayBasket] = useState(false);

  const onDisplayBasket = () => {
    setDisplayBasket(!displayBasket);
  }

  //console.log(cart);

  const callbacks = {
    onAddToCart: useCallback((item) => store.addItemToCart(item), [store])
  }

  return (
    <>
      {displayBasket && <ShopBasketModal display={displayBasket} items={store.getState().cart} totalPrice={store.getTotalCartPrice()} totalCount={store.getTotalCartCount()} onDisplay={onDisplayBasket}/>}
      <Layout theme="shop" head={<h1>Магазин</h1>}>
        <ShopBasket onDisplay={onDisplayBasket} totalPrice={store.getTotalCartPrice()} totalCount={store.getTotalCartCount()} />
        <ListShop items={store.getState().items}
              onAddToCart={callbacks.onAddToCart}  
        />
      </Layout>
    </>
  );
}

export default App;