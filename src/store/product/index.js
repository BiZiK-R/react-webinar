import StoreModule from "../module";

class ProductStore extends StoreModule {

  /**
   * Начальное состояние
   */
  initState() {
    return {
      item: null
    };
  }

  /**
   * Загрузка товара
   */

  async load(id){
    const _apiPage = `/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`
    const response = await fetch(_apiPage);
    const json = await response.json();
    this.setState({
      item: json.result
    });
  }

  /**
   * Очистка товара
   */

  clear(){
    this.setState({
      item: null
    });
  }


}

export default ProductStore;
