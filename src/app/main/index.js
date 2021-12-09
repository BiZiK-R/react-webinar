import React, {useCallback, useEffect, useState} from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";
import Item from "../../components/item";
import Layout from "../../components/layout";
import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Pagination from "../../components/pagination";
import CardProduct from "../../components/card-product";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";

function Main() {

  const [page, setPage] = useState(0);
  const [selectProduct, setSelectProduct] = useState({});
  const {idProduct} = useParams();
  const limit = 10;

  const select = useSelector(state => ({
    items: state.catalog.items,
    count: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum,
    product: state.product.item,
  }));

  // Загрузка тестовых данных при первом рендере
  useEffect(async () => {
    await store.catalog.load(page, limit);
  }, [page]);


  const store = useStore();

  const callbacks = {
    addToBasket: useCallback((_id) => store.basket.add(_id), [store]),
    openModal: useCallback(() => store.modals.open('basket'), [store]),
  }

  const renders = {
    item: useCallback(item => {
      return <Link to={`/${item._id}`} style={{ textDecoration: 'none', color: '#000000' }}>
                <Item item={item} onAdd={callbacks.addToBasket}/>
             </Link>
    }, [callbacks.addToBasket]),
  }

  const onSelectPag = (e) => {
    setPage(e.target.value);
    console.log(e.target.value);
  }

  return (
      <Layout head={<h1>{select.product ? select.product.title : 'Магазин'}</h1>}>
        <BasketSimple onOpen={callbacks.openModal} amount={select.amount} sum={select.sum}/>
        <Routes>
          <Route path="/" exact element={
            <>
              <List items={select.items} renderItem={renders.item}/>
              <Pagination numberOfPages={select.count / limit} selectPage={page} onSelect={onSelectPag} />
            </>
          }/>
          <Route path="/:idProduct" element={
            <CardProduct onAdd={callbacks.addToBasket} />
          }/>
        </Routes>
      </Layout>
  );
}

export default React.memo(Main);
