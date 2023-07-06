import { GraphqlQueryError } from "@shopify/shopify-api";
import shopify from "./shopify.js";

export default async function metafieldCreator(session, req) {
  console.log(req);
  let metafield = {};
  new shopify.rest.Metafield({ session });
  try {
    metafield.variant_id = 41795306946753;
    metafield.namespace = "my_fields";
    metafield.key = "liner_material";
    metafield.type = "single_line_text_field";
    metafield.value = "synthetic leather";
    await metafield.save({
      update: true,
    });
  } catch (error) {
    if (error instanceof GraphqlQueryError) {
      throw new Error(
        `${error.message}\n${JSON.stringify(error.response, null, 2)}`
      );
    } else {
      throw error;
    }
  }
}
