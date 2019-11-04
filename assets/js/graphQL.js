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
            quantity,
            category {
              id,
              name
            }
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
    categories: `
    {
      categories {
        id,
        name
      }
    }`
  }
}

export default graphQL