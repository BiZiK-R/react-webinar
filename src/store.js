class Store {
  constructor(initState) {
    // Состояние приложения (данные)
    this.state = initState;
    // Подписчики на изменение state
    this.listners = [];
  }

  /**
   * Подписка на изменение state
   * @param callback {Function}
   */
  subscribe(callback) {
    this.listners.push(callback);
    // Возвращаем функцию для отписки
    return () => {
      this.listners = this.listners.filter(item => item !== callback);
    }
  }

  /**
   * Выбор state
   * @return {*}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка state
   * @param newState {*}
   */
  setState(newState) {
    this.state = newState;
    // Оповещаем всех подписчиков об изменении стейта
    for (const lister of this.listners) {
      lister(this.state);
    }
  }

  // Действия приложения.
  // @todo
  // Нужно вынести в отдельный слой, так как Store не определяет конкретную структуру состояния.
  // Может быть как модуль (расширение) для Store

  /**
   * Добавление товара в корзину по её коду
   * @param item
   */
  addItemToCart(item) {
    let coincidence = false;
    const newCart = this.state.cart.products.map(cartItem => {
      if(cartItem.code === item.code) {
        cartItem.count++;
        coincidence = true;
      }
      return cartItem;
    })
    if (!coincidence) {
      newCart.push({...item, count: 1});
    }
    this.setState({
      ...this.state,
      cart: { 
        products: newCart,
        totalCount: this.state.cart.totalCount + 1,
        totalPrice: this.state.cart.totalPrice + item.price,
      },
    });
  }

}

export default Store;