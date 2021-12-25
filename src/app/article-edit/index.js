import React, {useEffect} from "react";
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
    waitingArticle: state.article.waiting,
    waitingCategory: state.category.waiting,
    waitingCountry: state.country.waiting,
    waitingForm: state.formArticle.waiting,
    article: state.article.data,
  }));

  useEffect(() => {
    store.formArticle.initData({
      title: select.article.title ? select.article.title : '',
      description: select.article.description ? select.article.description : '',
      maidIn: select.article.maidIn ? select.article.maidIn._id : '',
      category: select.article.category ? select.article.category._id : '',
      edition: select.article.edition ? select.article.edition : '',
      price: select.article.price ? select.article.price : '',
      id: select.article._id ? select.article._id : '',
    });
  }, [select.article]);

  const onSubmit = async () => {
    await store.formArticle.put();
    await store.get('article').load(params.id);
  }

  const onDelete = () => {
    store.formArticle.del();
  }

  return (
    <Layout head={<h1>{select.article.title}</h1>}>

      <Header/>

      <Spinner active={select.waitingArticle || select.waitingCategory || select.waitingCountry || select.waitingForm}>
        <WrapperContent>
          <FormArticle onSubmit={onSubmit} />
          <button type="button" onClick={onDelete}>Удалить товар</button>
        </WrapperContent>
      </Spinner>
    </Layout>
  );
}

export default ArticleEdit;
