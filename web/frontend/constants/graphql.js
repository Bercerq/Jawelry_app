import { gql } from "@apollo/client";

export const GET_PRODUCTS_BY_ID = gql`
query {
  collections(first: 50) {
    edges {
      node {
        id
        handle
        title
        description
        image {
          originalSrc
        }
        metafields(first: 15) {
          edges {
            node {
              id
              key
              value
            }
          }
        }
      }
    }
  }
}
`;