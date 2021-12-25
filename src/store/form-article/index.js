import StoreModule from "../module";

class FormArticleStore extends StoreModule {

  /**
   * Начальное состояние
   */
  initState() {
    return {
      data: {
        title: '',
        description: '',
        maidIn: '',
        category: '',
        edition: '',
        price: '',
        id: '',
      },
      waiting: false,
      errors: {}
    };
  }


  initData(data) {
    const state = this.getState();
    this.updateState({
      ...state,
      data: data,
    });
  }

  update(name, value) {
    const state = this.getState();
    this.updateState({
      ...state,
      data: {
        ...state.data,
        [name]: value,
      }
    });
  }

  async put() {
    const state = this.getState();
    this.updateState({
      ...state,
      waiting: true,
    });

    const data = {
      title: state.data.title,
      description: state.data.description,
      maidIn: {
        _id: state.data.maidIn,
      },
      category: {
        _id: state.data.category,
      },
      edition: state.data.edition,
      price: state.data.price,
    }

    try {
      const res = await fetch(`/api/v1/articles/${state.data.id}`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const json = await res.json();

      if (json.error) {
        this.updateState({
          ...this.getState(),
          errors: {},
        });
        json.error.data.issues.forEach((item) => {
          const state = this.getState();
          this.updateState({
            ...state,
            errors: {
              ...state.errors,
              [item.path]: item.message,
            },
          });
        })
        const state = this.getState();
        this.updateState({
          ...state,
          errors: {
            ...state.errors,
            message: json.error.message,
          },
        });
      }
    } catch(e) {
      const state = this.getState();
      this.updateState({
        ...state,
        errors: {
          ...state.errors,
          message: 'Что-то пошло не так',
        }
      });
    }
    this.updateState({
      ...this.getState(),
      waiting: false,
    });
  }

  async del() {
    const id = this.getState().data.id;
    this.updateState({
      ...this.getState(),
      waiting: true,
    });
    try {
      const res = await fetch(`/api/v1/articles/${id}`,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({_id: id})
      });
      const json = await res.json();
      if (json.error) {
        this.updateState({
          ...this.getState(),
          errors: json.error.error,
        });
      } else {
        alert('Товар удалён');
      }
    } catch(e) {
      const state = this.getState();
      this.updateState({
        ...state,
        errors: {
          ...state.errors,
          message: 'Что-то пошло не так',
        }
      });
    }
    this.updateState({
      ...this.getState(),
      waiting: false,
    });
  }

  async post() {
    const state = this.getState();
    this.updateState({
      ...state,
      waiting: true,
    });
    const data = {
      title: state.data.title,
      name: state.data.title,
      description: state.data.description,
      maidIn: {
        _id: state.data.maidIn,
      },
      category: {
        _id: state.data.category,
      },
      edition: state.data.edition,
      price: state.data.price,
      _key: Date.now(),
    }
    try {
      const res = await fetch(`/api/v1/articles`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (json.error) {
        this.updateState({
          ...this.getState(),
          errors: json.error.error,
        });
      }
      else {
        alert('Товар создан');
      }
    } catch(e) {
      const state = this.getState();
      this.updateState({
        ...state,
        errors: {
          ...state.errors,
          message: 'Что-то пошло не так',
        }
      });
    }
    this.updateState({
      ...this.getState(),
      waiting: false,
    });
  }
}

export default FormArticleStore;
