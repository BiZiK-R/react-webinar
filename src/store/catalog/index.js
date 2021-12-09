import StoreModule from "../module";

class CatalogStore extends StoreModule {

  /**
   * Начальное состояние
   */
  initState() {
    return {
      items: [],
      count: 0,
    };
  }

  /**
   * Загрузка списка товаров
   */
  async load(page = 0, limit = 10){
    const _apiPage = `/api/v1/articles?lang=ru&limit=${limit}&skip=${page*limit}&fields=items(*),count`
    const response = await fetch(_apiPage);
    const json = await response.json();
    this.setState({
      items: json.result.items,
      count: json.result.count,
    });
  }
}

export default CatalogStore;
