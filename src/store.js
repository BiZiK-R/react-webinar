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
   * Создание записи
   */
  createItem() {
    const code = Math.max(0, ...this.state.items.map(item => item.code)) + 1;
    this.setState({
      ...this.state,
      items: this.state.items.concat({
        code,
        title: 'Новая запись №'+code
      })
    });
  }

  /**
   * Удаление записи по её коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      items: this.state.items.filter(item => item.code !== code)
    });
  }

  /**
   * Выделение записи по её коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      items: this.state.items.map(item => {
        if (item.code === code){
          return {
            ...item,
            selected: !item.selected,
            //counter: counterItem(item)
          };
        }
        return item;
      })
    });
  }

  /**
   * Добавление товара в корзину по её коду
   * @param item
   */
  addItemToCart(item) {
    let coincidence = false;
    const newCart = this.state.cart.map(cartItem => {
      if(cartItem.code === item.code) {
        coincidence = true;
        return ({
          ...cartItem,
          count: cartItem.count + 1,
        })
      }
      return cartItem;
    })
    if (!coincidence) {
      newCart.push({...item, count: 1});
    }
    this.setState({
      ...this.state,
      cart: newCart,
      
    });
  }

  getTotalCartPrice() {
    let totalPrice = 0;
    this.state.cart.forEach(cartItem => {
      totalPrice += cartItem.price * cartItem.count;
    });
    return totalPrice;
  }

  getTotalCartCount() {
    let totalCount = 0;
    this.state.cart.forEach(cartItem => {
      totalCount += cartItem.count;
    });
    return totalCount;
  }

  counterItem(item) {
    if (!item.selected) {
      if (typeof(item.counter) === 'undefined') item.counter = 0;
      item.counter++;
    }
    return item.counter;
  }
}

export default Store;