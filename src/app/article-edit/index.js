import React, {useEffect, useCallback} from "react";
import Layout from "../../components/layout";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import {useParams, useNavigate} from "react-router-dom";
import Spinner from "../../components/spinner";
import Header from "../../containers/header";
import useInit from "../../utils/use-init";
import FormArticle from "../../containers/form-article";
import WrapperContent from "../../components/wrapper-content";

function ArticleEdit() {

  const store = useStore();
  // Параметры из пути
  const params = useParams();

  // Начальная загрузка
  useInit(() => {
    store.get('article').load(params.id);
    store.category.load();
    store.country.load();
  }, [params.id]);

  const select = useSelector(state => ({
    waiting: state.article.waiting || state.category.waiting || state.country.waiting || state.formArticle.waiting,
    article: state.article.data,
  }));

  useEffect(() => {
    store.formArticle.initData(select.article);
  }, [select.article]);

  const callbacks = {
    onPut: useCallback(() => store.formArticle.put(), [store]),
    onDelete: useCallback(() => store.formArticle.del(), [store]),
  }

  return (
    <Layout head={<h1>{select.article.title}</h1>}>

      <Header/>

      <Spinner active={select.waiting}>
        <WrapperContent>
          <FormArticle onSubmit={callbacks.onPut} />
          <button type="button" onClick={callbacks.onDelete}>Удалить товар</button>
        </WrapperContent>
      </Spinner>
    </Layout>
  );
}

export default ArticleEdit;
