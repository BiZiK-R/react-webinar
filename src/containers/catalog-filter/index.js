import React, {useCallback, useMemo} from "react";
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";
import Select from "../../components/select";
import LayoutTools from "../../components/layout-tools";
import Input from "../../components/input";

function CatalogFilter() {

  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    selectCategory: state.catalog.params.category,
    category: state.category.items,
  }));

  // Опции для полей
  const options = {
    sort: useMemo(() => ([
      {value:'key', title: 'По коду'},
      {value:'title.ru', title: 'По именованию'},
      {value:'-price', title: 'Сначала дорогие'},
      {value:'edition', title: 'Древние'},
    ]), []),
    category: useMemo(() => {
      const categories = select.category.map(item => ({value: item._id, title: item.title}))
      return [
      {value:'', title: 'Все'},
      ].concat(categories);
    }, [select.category]),
  }

  const callbacks = {
    onSort: useCallback(sort => store.catalog.setParams({sort}), [store]),
    onSearch: useCallback(query => store.catalog.setParams({query, page: 1}), [store]),
    onReset: useCallback(() => store.catalog.resetParams(), [store]),
    onCategory: useCallback(category => store.catalog.setParams({category, page: 1}), [store]),
  }

  return (
    <LayoutTools>
      <Select onChange={(e) => callbacks.onCategory(e.target.value)} value={select.selectCategory} options={options.category}/>
      <Input onChange={callbacks.onSearch} value={select.query} placeholder={'Поиск'} theme="big"/>
      <label>Сортировка:</label>
      <Select onChange={(e) => callbacks.onSort(e.target.value)} value={select.sort} options={options.sort}/>
      <button onClick={callbacks.onReset}>Сбросить</button>
    </LayoutTools>
  );
}

export default React.memo(CatalogFilter);
