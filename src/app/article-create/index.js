import React, {useCallback, useState, useEffect} from "react";
import Layout from "../../components/layout";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import {useParams, useNavigate} from "react-router-dom";
import Spinner from "../../components/spinner";
import Header from "../../containers/header";
import useInit from "../../utils/use-init";
import FormArticle from "../../containers/form-article";
import WrapperContent from "../../components/wrapper-content";

function ArticleCreate() {

  const store = useStore();

  // Начальная загрузка
  useInit(() => {
    store.category.load();
    store.country.load();
  }, []);


  const select = useSelector(state => ({
    waitingCategory: state.category.waiting,
    waitingCountry: state.country.waiting,
    waitingForm: state.formArticle.waiting,
    article: state.article.data,
  }));

  useEffect(() => {
    store.formArticle.initData({
      title: '',
      description: '',
      maidIn: '',
      category: '',
      edition: '',
      price: '',
      id: '',
    });
  }, [select.article]);

  const onSubmit = async () => {
    store.formArticle.post();
  }

  return (
    <Layout head={<h1>Создание товара</h1>}>

      <Header/>

      <Spinner active={select.waitingCategory || select.waitingCountry || select.waitingForm}>
        <WrapperContent>
          <FormArticle onSubmit={onSubmit} />
        </WrapperContent>
      </Spinner>
    </Layout>
  );
}

export default ArticleCreate;
