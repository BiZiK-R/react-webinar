import StoreModule from "../module";

class CountryStore extends StoreModule {

  /**
   * Начальное состояние
   */
  initState() {
    return {
      items: [],
      waiting: true,
    };
  }


  async load(){

    try {
      const response = await fetch(`/api/v1/countries?lang=ru&limit=*&skip=0&fields=title,code`);
      const json = await response.json();
      this.setState({
        items: json.result.items.sort((a, b) => {
          if (a.title > b.title) {
            return 1;
          }
          if (a.title < b.title) {
            return -1;
          }
          // a должно быть равным b
          return 0;
        }),
        waiting: false,
      });
    } catch (e){
      this.setState({
        items: [],
        waiting: false,
      });
      console.error('Категории не загружены');
    }
  }

}

export default CountryStore;
