import React, {useMemo, useState} from 'react';
import {cn} from '@bem-react/classname'
import useSelector from "../../utils/use-selector";
import './styles.css';
import WrapperTextFields from '../../components/wrapper-text-fields';
import Select from '../../components/select';
import propTypes from "prop-types";

function FormArticle({errorRes, data, onSubmit}){

  // CSS классы по БЭМ
  const className = cn('EditCard');

  const [values, setValues] = useState({
    title: data.title,
    description: data.description,
    maidIn: data.maidIn ? data.maidIn._id : '',
    category: data.category ? data.category._id : '',
    edition: data.edition,
    price: data.price,
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }

  const select = useSelector(state => ({
    category: state.category.items,
    country: state.country.items,
  }));

  const options = {
    category: useMemo(() => {
      const category = select.category.map(item => ({value: item._id, title: item.title}));
      return [].concat(category)
    }, [select.category]),
    country: useMemo(() => {
      const country = select.country.map(item => ({value: item._id, title: item.title}));
      return [].concat(country)
    }, [select.country]),
  }

  return (
    <div className={className()}>
      <form onSubmit={(e) => {e.preventDefault(); onSubmit(values)}}>
        <WrapperTextFields description='Название'>
          <input
            required
            type="text"
            name='title'
            onChange={handleChange}
            value={values.title}
          />
        </WrapperTextFields>
        <WrapperTextFields description='Описание'>
          <textarea
            type="text"
            name='description'
            onChange={handleChange}
            value={values.description}
          />
        </WrapperTextFields>
        <WrapperTextFields description='Страна производитель'>
          <Select
            name='maidIn'
            onChange={handleChange}
            value={values.maidIn}
            options={options.country}
          />
        </WrapperTextFields>
        <WrapperTextFields description='Категория'>
        <Select
            name='category'
            onChange={handleChange}
            value={values.category}
            options={options.category}
          />
        </WrapperTextFields>
        <WrapperTextFields description='Год выпуска'>
          <input
            required
            type="number"
            name='edition'
            onChange={handleChange}
            value={values.edition}
          />
        </WrapperTextFields>
        <WrapperTextFields description='Цена'>
          <input
            required
            type="number"
            name='price'
            onChange={handleChange}
            value={values.price}
          />
        </WrapperTextFields>
        <button type="submit">Сохранить</button>
      </form>
      <div>{errorRes}</div>
    </div>
  )
}

FormArticle.propTypes = {
  data: propTypes.object,
  onSubmit: propTypes.func,
}

FormArticle.defaultProps = {
  data: {
    title: '',
    description: '',
    maidIn: {
      _id: ''
    },
    category: {
      _id: ''
    },
    edition: '',
    price: '',
  },
  onSubmit: () => {},
}



export default React.memo(FormArticle);
