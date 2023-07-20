
  

  import { GraphqlQueryError } from "@shopify/shopify-api";
import shopify from "../shopify.js";

export default async (session, data) => {
  const client = new shopify.api.clients.Graphql({ session });

  try {
    await client.query({
        data: {
            query: `mutation setProductTag {
              productUpdate(input:{tags: "image-visualiser-configured", id: "${data.id}" }){
                product {
                  handle
                }
              }
            }`,
            variables: {
                id: data.id,
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
