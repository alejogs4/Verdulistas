const state = {
  cart: [],
  charge: {}
}

const mutations = {
  initCart: state => {
    try {
      let cart = localStorage.getItem('cart')
      if (cart) {
        state.cart = JSON.parse(cart)
      } else {
        localStorage.setItem('cart', [])
        state.cart = []
      }
    } catch (error) {
      console.log(error)
    }
  },
  removeCart: (state, payload) => {
    state.cart.splice(
      state.cart.findIndex(item => {
        return item.id === payload.id
      }),
      1
    )
  },
  setCart: (state, payload) => {
    state.cart.push(payload)
  },
  setQuantity: (state, payload) => {
    let item = state.cart.find(product => {
      return product.id === payload.id
    })
    item.qty = payload.qty
  },
  setPrice: (state, payload) => {
    let item = state.cart.find(product => {
      return product.id === payload.id
    })
    item.subtotal = payload.subtotal
  },
  setCharge: (state, payload) => {
    state.charge = payload
  }
}

const getters = {
  getCart: state => state.cart,
  getCharge: state => state.charge
}

const actions = {}

export default {
  state,
  getters,
  actions,
  mutations
}
