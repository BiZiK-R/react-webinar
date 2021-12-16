import StoreModule from "../module";

class CatalogStore extends StoreModule {

  /**
   * Начальное состояние
   */
  initState() {
    return {
      items: [],
      count: 0,
      limit: 10,
      page: 0,
      loading: false,
    };
  }

  /**
   * Загрузка списка товаров
   */
  async load(selectPage, selectLimit){
    this.setState({
      ...this.getState(),
      limit: selectLimit,
      page: selectPage,
      loading: true,
    });
    const {page, limit} = this.getState();
    const _apiPage = `/api/v1/articles?lang=ru&limit=${limit}&skip=${page*limit}&fields=items(*),count`
    const response = await fetch(_apiPage);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      items: json.result.items,
      count: json.result.count,
      loading: false,
    });
  }
}

export default CatalogStore;
