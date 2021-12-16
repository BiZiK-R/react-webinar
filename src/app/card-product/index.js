import React, {useCallback, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import Layout from "../../components/layout";
import BasketSimple from "../../components/basket-simple";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import InfoProduct from "../../components/info-product";

function CardProduct() {
  const select = useSelector(state => ({
    count: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum,
    product: state.product.item,
  }));

  const store = useStore();

  const callbacks = {
    addToBasket: useCallback((_id) => store.basket.add(_id), [store]),
    openModal: useCallback(() => store.modals.open('basket'), [store]),
  }

  const {idProduct} = useParams();

  useEffect(async () => {
    store.product.clear();
    await store.product.load(idProduct);
  }, [idProduct]);

  useEffect(() => {
    return () => {
      store.product.clear();
    };
  }, []);

  return (
      <Layout head={<h1>{select.product ? select.product.title : ''}</h1>}>
        <BasketSimple onOpen={callbacks.openModal} amount={select.amount} sum={select.sum}/>
          <InfoProduct onAdd={callbacks.addToBasket} product={select.product} />
      </Layout>
  );
}

export default React.memo(CardProduct);
