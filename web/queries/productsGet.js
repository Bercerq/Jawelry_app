import { GraphqlQueryError } from "@shopify/shopify-api";
import shopify from "../shopify.js";

export default async (session, data) => {
  const client = new shopify.api.clients.Graphql({ session });
  let queryparam = "";
  if (Object.keys(data).length) {
    if (Object.keys(data).includes("sortKey")) {
      queryparam = `${
        "sortKey:TITLE, reverse:" +
        data.sortKey.reverse +
        ((data?.after ? ", after:" + `"${data?.after}"` : "") ||
          (data?.before ? ", before:" + `"${data?.before}"` : ""))
      }, first:10`;
    } else {
      for (const key of Object.keys(data)) {
        const value = Object.values(data)[Object.keys(data).indexOf(key)];
        queryparam += `, ${key}: ${
          typeof value === "string" ? `"${value}"` : value
        }`;
      }
    }
  }
  try {
    return await client.query({
      data: `
      query MyQuery {
        products(${queryparam}) {
          pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
          }
          nodes {
            handle
            id
            tags
            title
            images(first: 10) {
              nodes {
                altText
                src
              }
            }
            variants(first: 30) {
              nodes {
                id
                metafield(key: "visualiser", namespace: "personalisation") {
                  value
                }
                title
                displayName
              }
            }
            description
          }
        }
      }
      
      `,
    });
  } catch (e) {
    if (e instanceof GraphqlQueryError) {
      throw new Error(`${e.message}\n${JSON.stringify(e.response, null, 2)}`);
    } else {
      throw e;
    }
  }
};
