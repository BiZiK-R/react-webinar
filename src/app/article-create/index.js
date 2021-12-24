import React, {useCallback, useState} from "react";
import Layout from "../../components/layout";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import {useParams, useNavigate} from "react-router-dom";
import Spinner from "../../components/spinner";
import Header from "../../containers/header";
import useInit from "../../utils/use-init";
import FormArticle from "../../containers/form-article";

function ArticleCreate() {

  const store = useStore();
  // Параметры из пути
  const params = useParams();
  const navigate = useNavigate();

  const [errorRes, setErrorRes] = useState('');

  // Начальная загрузка
  useInit(async () => {
    await store.category.load();
    await store.country.load();
  }, []);


  const select = useSelector(state => ({
    waitingCategory: state.category.waiting,
    waitingCountry: state.country.waiting,
    article: state.article.data,
  }));

  const onSubmit = async (values) => {
    const data = {
      title: values.title,
      name: values.title,
      description: values.description,
      maidIn: {
        _id: values.maidIn,
      },
      category: {
        _id: values.category,
      },
      edition: values.edition,
      price: values.price,
      _key: Date.now(),
    }
    try {
      const res = await fetch(`/api/v1/articles`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (json.error) {
        setErrorRes(json.error.message);
      }
      else {
        navigate(`/articles/${json.result._id}`);
      }
    } catch(e) {
      setErrorRes('Что-то пошло не так');
    }
  }

  return (
    <Layout head={<h1>Создание товара</h1>}>

      <Header/>

      <Spinner active={select.waitingArticle || select.waitingCategory || select.waitingCountry}>
        <FormArticle errorRes={errorRes} onSubmit={onSubmit} />
      </Spinner>
    </Layout>
  );
}

export default ArticleCreate;
