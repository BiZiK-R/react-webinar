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

  const [selectPage, setSelectPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const select = useSelector(state => ({
    items: state.catalog.items,
    count: state.catalog.count,
    page: state.catalog.page,
    loading: state.catalog.loading,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  // Загрузка тестовых данных при первом рендере
  useEffect(async () => {
    await store.catalog.load(selectPage, limit);
  }, [selectPage]);

  console.log("render");
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
    setSelectPage(e.target.value);
  }

  return (
      <Layout head={<h1>Магазин</h1>}>
        <BasketSimple onOpen={callbacks.openModal} amount={select.amount} sum={select.sum}/>
        {select.loading ? 'Загрузка' : <>
          <List items={select.items} renderItem={renders.item}/>
          <Pagination numberOfPages={select.count / limit} selectPage={select.page} onSelect={onSelectPag} />
        </>}

      </Layout>
  );
}

export default React.memo(Main);
