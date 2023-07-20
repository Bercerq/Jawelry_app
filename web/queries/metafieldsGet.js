import { GraphqlQueryError } from "@shopify/shopify-api";
import shopify from "../shopify.js";

export default async (session, data) => {
  const client = new shopify.api.clients.Graphql({ session });
  try {
    return await client.query({
      data: `
        query {
          productVariant(id: "${data.variantId}") {
            metafield(key: "visualiser", namespace: "personalisation") {
              value
            }
          }
        }
      `
    });
  } catch (e) {
    if (e instanceof GraphqlQueryError) {
      throw new Error(`${e.message}\n${JSON.stringify(e.response, null, 2)}`);
    } else {
      throw e;
    }
  }
};
