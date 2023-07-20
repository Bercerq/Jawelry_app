// @ts-check
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";
import bodyParser from "body-parser";

import shopify from "./shopify.js";
import productCreator from "./product-creator.js";
import GDPRWebhookHandlers from "./gdpr.js";
import saveConfiguration from "./saveConfigureMetafields.js";
// import metafieldCreator from "./variant_metafield-creator.js";
import metafieldsSet from "./mutations/metafieldsSet.js";
import metafieldsGet from "./queries/metafieldsGet.js";
import productTagSet from "./mutations/productTagSet.js";
import productsGet from "./queries/productsGet.js";

const PORT = parseInt(
  process.env.BACKEND_PORT || process.env.PORT || "3000",
  10
);

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const app = express();

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
);
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: GDPRWebhookHandlers })
);

// If you are adding routes outside of the /api path, remember to
// also add a proxy rule for them in web/frontend/vite.config.js

app.use("/api/*", shopify.validateAuthenticatedSession());

app.use(express.json());

// app.get("/api/products/count", async (_req, res) => {
//   const countData = await shopify.api.rest.Product.count({
//     session: res.locals.shopify.session,
//   });
//   res.status(200).send(countData);
// });

// app.get("/api/products?", async (_req, res) => {
//   try {
//     const response = await shopify.api.rest.Product.all({
//       session: res.locals.shopify.session,
//       page_info: _req?.query.page_info || null,
//       // title: _req?.query.title || null,
//       limit: 250,
//     });
//     res.status(200).send(response);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

app.post("/api/products", async (_req, res) => {
  try {
    const response = await productsGet(res.locals.shopify.session, _req.body);
    res.status(200).send(response);
  } catch (error) {
    console.error("Error get products:", error);
    res.status(500).send({ error: "Failed to get products" });
  }
});
app.post(`/api/product/tag/set`, async (_req, res) => {
  try {
    await productTagSet(res.locals.shopify.session, _req.body);
    res.status(200).json({ status: 200 });
  } catch (error) {
    console.error("Error creating metafield:", error);
    res.status(200).json({ status: 500 });
    res.status(500).send({ error: "Failed to create metafield" });
  }
});

app.post(`/api/metafields/set`, async (_req, res) => {
  try {
    await metafieldsSet(res.locals.shopify.session, _req.body);
    res.status(200).json({ status: 200 });
  } catch (error) {
    console.error("Error creating metafield:", error);
    res.status(200).json({ status: 500 });
    res.status(500).send({ error: "Failed to create metafield" });
  }
});

app.post(`/api/metafields/get`, async (_req, res) => {
  try {
    const queryRes = await metafieldsGet(res.locals.shopify.session, _req.body);
    res.status(200).json({ data: queryRes });
  } catch (error) {
    console.error("Error creating metafield:", error);
    res.status(500).send({ error: "Failed to create metafield" });
  }
});

// app.get("/api/products/create", async (_req, res) => {
//   let status = 200;
//   let error = null;

//   try {
//     await productCreator(res.locals.shopify.session);
//   } catch (e) {
//     console.log(`Failed to process products/create: ${e.message}`);
//     status = 500;
//     error = e.message;
//   }
//   res.status(status).send({ success: status === 200, error });
// });

// app.get("/collections", async (req, res) => {
//   const session = res.locals.shopify.session;

//   try {
//     const client = new shopify.api.clients.Graphql(session);

//     const ORDERS_QUERY = `
//     query {
//   collections(first: 50) {
//     edges {
//       node {
//         id
//         handle
//         title
//         description
//         image {
//           originalSrc
//         }
//         metafields(first: 15) {
//           edges {
//             node {
//               id
//               key
//               value
//             }
//           }
//         }
//       }
//     }
//   }
//     }`;

//     const response = await client.query({ data: ORDERS_QUERY });
//     res.status(200).send(response.body);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

app.use(shopify.cspHeaders());
app.use(serveStatic(STATIC_PATH, { index: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});

app.listen(PORT);
