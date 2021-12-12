import React, {useCallback, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import Item from "../../components/item";
import Layout from "../../components/layout";
import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Pagination from "../../components/pagination";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";

function Main() {

  const [loadPage, setLoadPage] = useState(false);
  const limit = 10;

  const select = useSelector(state => ({
    items: state.catalog.items,
    count: state.catalog.count,
    page: state.catalog.page,
    amount: state.basket.amount,
    sum: state.basket.sum,
    product: state.product.item,
  }));

  // Загрузка тестовых данных при первом рендере
  useEffect(async () => {
    setLoadPage(true);
    await store.catalog.load();
    setLoadPage(false);
  }, [select.page]);


  const store = useStore();

  const callbacks = {
    addToBasket: useCallback((_id) => store.basket.add(_id), [store]),
    openModal: useCallback(() => store.modals.open('basket'), [store]),
    selectPage: useCallback((selectPage) => store.catalog.setPage(selectPage), [store]),
  }

  const renders = {
    item: useCallback(item => {
      return <Link to={`/${item._id}`} style={{ textDecoration: 'none', color: '#000000' }}>
                <Item item={item} onAdd={callbacks.addToBasket}/>
             </Link>
    }, [callbacks.addToBasket]),
  }

  const onSelectPag = (e) => {
    callbacks.selectPage(e.target.value);
    console.log(e.target.value);
  }

  return (
      <Layout head={<h1>{select.product ? select.product.title : 'Магазин'}</h1>}>
        <BasketSimple onOpen={callbacks.openModal} amount={select.amount} sum={select.sum}/>
        {loadPage ? 'Загрузка' : <>
          <List items={select.items} renderItem={renders.item}/>
          <Pagination numberOfPages={select.count / limit} selectPage={select.page} onSelect={onSelectPag} />
        </>}

      </Layout>
  );
}

export default React.memo(Main);
