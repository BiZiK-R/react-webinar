import React, {useMemo} from 'react';
import {cn} from '@bem-react/classname'
import useSelector from "../../utils/use-selector";
import './styles.css';
import WrapperTextFields from '../../components/wrapper-text-fields';
import {Formik} from "formik";
import Select from '../../components/select';
import * as yup from 'yup';
import propTypes from "prop-types";

function FormArticle({errorRes, data, onSubmit}){
  const validationSchema = yup.object().shape({
    title: yup.string().max(100, 'Не больше 100 символов').required('Обязательно к заполнению'),
    description: yup.string().max(1500, 'Описание не должно превышать 1500 символов'),
    maidIn: yup.string().required('Обязательно к заполнению'),
    category: yup.string().required('Обязательно к заполнению'),
    edition: yup.number('Должно быть числом').max(2022, 'Год не должен привышать нынешний').positive('Год должно быть положительным числом').integer('Год должно быть целым числом').required('Обязательно к заполнению'),
    price: yup.number('Должно быть числом').positive('Цена должна быть положительным числом').required('Обязательно к заполнению'),
  })

  // CSS классы по БЭМ
  const className = cn('EditCard');

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
      <Formik
            initialValues={{
              title: data.title,
              description: data.description,
              maidIn: data.maidIn ? data.maidIn._id : '',
              category: data.category ? data.category._id : '',
              edition: data.edition,
              price: data.price,
            }}
            onSubmit={(values) => {
              onSubmit(values)
            }}
            validationSchema={validationSchema}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isValid,
              dirty
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit}>
                <WrapperTextFields description='Название' error={errors.title && touched.title && errors.title}>
                  <input
                    type="text"
                    name='title'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                  />
                </WrapperTextFields>
                <WrapperTextFields description='Описание' error={errors.description && touched.description && errors.description}>
                  <textarea
                    type="text"
                    name='description'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                  />
                </WrapperTextFields>
                <WrapperTextFields description='Страна производитель' error={errors.maidIn && touched.maidIn && errors.maidIn}>
                  <Select
                    name='maidIn'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.maidIn}
                    options={options.country}
                  />
                </WrapperTextFields>
                <WrapperTextFields description='Категория' error={errors.category && touched.category && errors.category}>
                <Select
                    name='category'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.category}
                    options={options.category}
                  />
                </WrapperTextFields>
                <WrapperTextFields description='Год выпуска' error={errors.edition && touched.edition && errors.edition}>
                  <input
                    type="text"
                    name='edition'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.edition}
                  />
                </WrapperTextFields>
                <WrapperTextFields description='Цена' error={errors.price && touched.price && errors.price}>
                  <input
                    type="text"
                    name='price'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price}
                  />
                </WrapperTextFields>
                <button disabled={!isValid || !dirty} type="submit">Сохранить</button>
              </form>
            )}
      </Formik>
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
