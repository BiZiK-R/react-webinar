import React, {useCallback, useState} from "react";
import Layout from "../../components/layout";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import {useParams} from "react-router-dom";
import Spinner from "../../components/spinner";
import Header from "../../containers/header";
import useInit from "../../utils/use-init";
import FormArticle from "../../containers/form-article";

function ArticleEdit() {

  const store = useStore();
  // Параметры из пути
  const params = useParams();

  const [errorRes, setErrorRes] = useState('');

  // Начальная загрузка
  useInit(async () => {
    await store.get('article').load(params.id);
    await store.category.load();
    await store.country.load();
  }, [params.id]);


  const select = useSelector(state => ({
    waitingArticle: state.article.waiting,
    waitingCategory: state.category.waiting,
    waitingCountry: state.country.waiting,
    article: state.article.data,
  }));

  const onSubmit = async (values) => {
    const data = {
      title: values.title,
      description: values.description,
      maidIn: {
        _id: values.maidIn,
      },
      category: {
        _id: values.category,
      },
      edition: values.edition,
      price: values.price,
    }
    try {
      const res = await fetch(`/api/v1/articles/${params.id}`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const json2 = await res.json();
    } catch(e) {
      setErrorRes('Что-то пошло не так');
    }
  }

  const callbacks = {
    addToBasket: useCallback((_id) => store.basket.add(_id), [store]),
  }

  return (
    <Layout head={<h1>{select.article.title}</h1>}>

      <Header/>

      <Spinner active={select.waitingArticle || select.waitingCategory || select.waitingCountry}>
        <FormArticle errorRes={errorRes} data={select.article} onSubmit={onSubmit} />
      </Spinner>
    </Layout>
  );
}

export default ArticleEdit;
