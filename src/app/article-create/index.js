import React, {useCallback, useState, useEffect} from "react";
import Layout from "../../components/layout";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
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
    waiting: state.category.waiting || state.country.waiting || state.formArticle.waiting,
    article: state.article.data,
  }));

  useEffect(() => {
    store.formArticle.initData({});
  }, [select.article]);

  const callbacks = {
    onPost: useCallback(() => store.formArticle.post(), [store]),
  }

  return (
    <Layout head={<h1>Создание товара</h1>}>

      <Header/>

      <Spinner active={select.waiting}>
        <WrapperContent>
          <FormArticle onSubmit={callbacks.onPost} />
        </WrapperContent>
      </Spinner>
    </Layout>
  );
}

export default ArticleCreate;
