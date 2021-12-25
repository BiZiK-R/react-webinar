import React, {useMemo} from 'react';
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";
import WrapperTextFields from '../../components/wrapper-text-fields';
import Select from '../../components/select';
import Input from '../../components/input';
import propTypes from "prop-types";

function FormArticle({onSubmit}){

  const store = useStore();

  const handleChange = (value, name) => {
    store.formArticle.update(name, value);
  }

  const select = useSelector(state => ({
    category: state.category.items,
    country: state.country.items,
    data: state.formArticle.data,
    errors: state.formArticle.errors,
  }));

  const options = {
    category: useMemo(() => {
      const category = select.category.map(item => ({value: item._id, title: item.title}));
      return [].concat(category)
    }, [select.category]),
    country: useMemo(() => {
      const country = select.country.map(item => ({value: item._id, title: item.title}));
      return [{value: '', title: 'Не выбрано'}].concat(country)
    }, [select.country]),
  }

  return (
    <>
      <form onSubmit={(e) => {e.preventDefault(); onSubmit()}}>
        <WrapperTextFields description='Название' error={select.errors.title}>
          <Input
            required
            type="text"
            name='title'
            onChange={handleChange}
            value={select.data.title}
          />
        </WrapperTextFields>
        <WrapperTextFields description='Описание' error={select.errors.description}>
          <textarea
            type="text"
            name='description'
            onChange={handleChange}
            value={select.data.description}
          />
        </WrapperTextFields>
        <WrapperTextFields description='Страна производитель' error={select.errors.maidIn}>
          <Select
            name='maidIn'
            onChange={handleChange}
            value={select.data.maidIn}
            options={options.country}
          />
        </WrapperTextFields>
        <WrapperTextFields description='Категория' error={select.errors.category}>
        <Select
            name='category'
            onChange={handleChange}
            value={select.data.category}
            options={options.category}
          />
        </WrapperTextFields>
        <WrapperTextFields description='Год выпуска' error={select.errors.edition}>
          <Input
            required
            type="number"
            name='edition'
            onChange={handleChange}
            value={select.data.edition}
          />
        </WrapperTextFields>
        <WrapperTextFields description='Цена' error={select.errors.price}>
          <Input
            required
            type="number"
            name='price'
            onChange={handleChange}
            value={select.data.price}
          />
        </WrapperTextFields>
        <button type="submit">Сохранить</button>
      </form>
      <div>{select.errors.message}</div>
    </>
  )
}

FormArticle.propTypes = {
  onSubmit: propTypes.func,
}

FormArticle.defaultProps = {
  onSubmit: () => {},
}



export default React.memo(FormArticle);
