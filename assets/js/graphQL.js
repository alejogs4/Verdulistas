let graphQL = {
    queries: {
        catalogue: `
        {
          products {
            id,
            code,
            name,
            description,
            price,
            image,
            quantity
          }
          userCart {
            id
            cartItems {
              id
              quantity
              cart_id
              product {
                id
                name
                price
              }
            }
          }
        }
      `,
    }
}

export default graphQL