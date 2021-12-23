import StoreModule from "../module";

class CategoryStore extends StoreModule {

  /**
   * Начальное состояние
   */
  initState() {
    return {
      items: [],
      waiting: true,
    };
  }

  calculatingDepth(item, count, arr) {
    if (item.parent) {
      const parentID = item.parent._id;
      const parent = arr.find(item => item._id === parentID);
      return this.calculatingDepth(parent, count+1, arr);
    }
    return count;
  }

  creatingTreeStructure(arr) {
    arr.forEach(item => {
      const countDepth = this.calculatingDepth(item, 0, arr);
      for (let i = 0; i < countDepth; i++) {
        item.title = '-' + item.title;
      }
      if (item.parent) {
        let indexItem, indexParent;
        arr.forEach((itemTree, index) => {
          if (itemTree._id === item._id) {
            indexItem = index;
          }
          if (itemTree._id === item.parent._id) {
            indexParent = index;
          }
        });
        arr.splice(indexParent+1, 0, arr.splice(indexItem, 1)[0]);
      }

    })

    return arr;
  }


  async load(){
    this.setState({
      items: [],
      waiting: true,
    });

    try {
      const response = await fetch(`/api/v1/categories?lang=ru&limit=*&fields=title,parent(title)`);
      const json = await response.json();
      const category = json.result.items;
      this.setState({
        items: this.creatingTreeStructure(category.slice()),
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

export default CategoryStore;
