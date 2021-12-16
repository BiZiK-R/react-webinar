import React, {useEffect} from 'react';
import propTypes from 'prop-types';
import './styles.css';

function InfoProduct({onAdd, product}) {

  const View = !product ? 'Загрузка' : (
    <>
      <p className="InfoProduct__description">{product.desciption}</p>
      <p>Страна производитель: <span className="InfoProduct__country">{product.maidIn.title} ({product.maidIn.code})</span></p>
      <p>Категория: <span className="InfoProduct__сategory">{product.category.title}</span></p>
      <p>Год выпуска: <span className="InfoProduct__edition">{product.edition}</span></p>
      <p className="InfoProduct__price">Цена:  {product.price} ₽</p>
      <button onClick={() => onAdd(product._id)}>Добавить</button>
    </>
  )


  return (
    <div className="InfoProduct">
      {View}
    </div>
  )
}

InfoProduct.propTypes = {
  onAdd: propTypes.func,
  product: propTypes.object
}

InfoProduct.defaultProps = {
  onAdd: () => {},
  product: null,
}

export default React.memo(InfoProduct);
