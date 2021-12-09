import React, {useEffect} from 'react';
import propTypes from 'prop-types';
import { useParams } from "react-router-dom";
import './styles.css';
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";

function CardProduct({onAdd}) {

  const {idProduct} = useParams();

  console.log(idProduct);

  const select = useSelector(state => ({
    product: state.product.item,
  }));

  useEffect(async () => {
    store.product.clear();
    await store.product.load(idProduct);
  }, [idProduct]);

  useEffect(() => {
    return () => {
      store.product.clear();
    };
  }, []);

  const store = useStore();

  console.log(select.product);

  const View = !select.product ? 'Загрузка' : (
    <>
      <p className="CardProduct__description">{select.product.desciption}</p>
      <p>Страна производитель: <span className="CardProduct__country">{select.product.maidIn.title} ({select.product.maidIn.code})</span></p>
      <p>Категория: <span className="CardProduct__сategory">{select.product.category.title}</span></p>
      <p>Год выпуска: <span className="CardProduct__edition">{select.product.edition}</span></p>
      <p className="CardProduct__price">Цена:  {select.product.price} ₽</p>
      <button onClick={() => onAdd(select.product._id)}>Добавить</button>
    </>
  )


  return (
    <div className="CardProduct">
      {View}
    </div>
  )
}

CardProduct.propTypes = {
  onAdd: propTypes.func,
}

CardProduct.defaultProps = {
  onAdd: () => {},
}

export default React.memo(CardProduct);
