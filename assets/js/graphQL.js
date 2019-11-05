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
        name,
        icon
      }
    }`,
    orders: `
    {
      orders {
        id,
        address,
        phone,
        order_date,
        user {
          id,
          name,
          lastname,
          email
        },
      }
    }`
  }
}

export default graphQL