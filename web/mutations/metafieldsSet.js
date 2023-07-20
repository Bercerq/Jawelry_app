import { GraphqlQueryError } from "@shopify/shopify-api";
import shopify from "../shopify.js";

const METAFIELD_SET_MUTATION = `
mutation MetafieldsSet($metafields: [MetafieldsSetInput!]!) {
    metafieldsSet(metafields: $metafields) {
      metafields {
        key
        namespace
        value
        createdAt
        updatedAt
      }
      userErrors {
        field
        message
        code
      }
    }
  }
`;

export default async (session, data) => {
  const client = new shopify.api.clients.Graphql({ session });

  try {
    await client.query({
        data: {
            query: METAFIELD_SET_MUTATION,
            variables: {
                metafields: data
            }
        }
    })
  } catch (e) {
    if (e instanceof GraphqlQueryError) {
      throw new Error(`${e.message}\n${JSON.stringify(e.response, null, 2)}`);
    } else {
      throw e;
    }
  }
};
