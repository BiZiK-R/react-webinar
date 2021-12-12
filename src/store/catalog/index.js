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
      page: 2,
    };
  }

  /**
   * Загрузка списка товаров
   */
  async load(){
    const {limit, page} = this.getState();
    const _apiPage = `/api/v1/articles?lang=ru&limit=${limit}&skip=${page*limit}&fields=items(*),count`
    const response = await fetch(_apiPage);
    const json = await response.json();
    this.setState({
      items: json.result.items,
      count: json.result.count,
      limit,
      page,
    });
  }

  setPage(selectPage) {
    const {limit, page, items, count} = this.getState();
    this.setState({
      items,
      count,
      limit,
      page: selectPage,
    });
  }
}

export default CatalogStore;
