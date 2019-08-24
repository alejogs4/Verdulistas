const state = {
  product: {}
}

const mutations = {
  initProduct: state => {
    try {
      let product = localStorage.getItem('product')
      if (product) {
        state.product = JSON.parse(product)
      } else {
        localStorage.setItem('product', JSON.stringify({}))
        state.product = {}
      }
    } catch (error) {}
  },
  removeProduct: (state, payload) => {
    state.product = {}
  },
  setProduct: (state, payload) => {
    state.product = payload
  }
}

const getters = {
  getProduct: state => state.product
}

const actions = {}

export default {
  state,
  getters,
  actions,
  mutations
}
