import { BrowserRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NavigationMenu } from "@shopify/app-bridge-react";
import {
  Provider as AppBridgeProvider,
  useAppBridge,
} from "@shopify/app-bridge-react";
import Routes from "./Routes";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { PolarisProvider } from "./components";
import { authenticatedFetch } from "@shopify/app-bridge/utilities";
import { Frame } from "@shopify/polaris";
import { Redirect } from "@shopify/app-bridge/actions";

export default function App() {
  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info
  const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)");

  return (
    <PolarisProvider>
      <BrowserRouter>
        <AppBridgeProvider
          config={{
            apiKey: process.env.SHOPIFY_API_KEY,
            host: new URL(location).searchParams.get("host"),
            forceRedirect: true,
          }}
        >
          <MyProvider>
            {/* <NavigationMenu
              navigationLinks={[
                {
                  label: "Configure",
                  destination: "/configurepage",
                },
              ]}
            /> */}
            <Frame>
              <Routes pages={pages} />
            </Frame>
          </MyProvider>
        </AppBridgeProvider>
      </BrowserRouter>
    </PolarisProvider>
  );
}
function MyProvider({ children }) {
  const app = useAppBridge();
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      credentials: "include",
      fetch: authenticatedFetch(app),
      uri: `/admin/api/2023-07/graphql.json`,

      headers: {
        "Content-Type": "application/graphql",
      },
    }),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export function userLoggedInFetch(app) {
  const fetchFunction = authenticatedFetch(app);

  return async (uri, options) => {
    const response = await fetchFunction(uri, options);

    if (
      response.headers.get("X-Shopify-API-Request-Failure-Reauthorize") === "1"
    ) {
      const authUrlHeader = response.headers.get(
        "X-Shopify-API-Request-Failure-Reauthorize-Url"
      );

      const redirect = Redirect.create(app);
      redirect.dispatch(Redirect.Action.APP, authUrlHeader || `/auth`);
      return null;
    }

    return response;
  };
}

// import { BrowserRouter } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { NavigationMenu, useAppBridge } from "@shopify/app-bridge-react";
// import Routes from "./Routes";

// import {
//   AppBridgeProvider,
//   QueryProvider,
//   PolarisProvider,
// } from "./components";
// import { Frame } from "@shopify/polaris";

// export default function App() {
//   // Any .tsx or .jsx files in /pages will become a route
//   // See documentation for <Routes /> for more info
//   const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)");



//   return (
//     <PolarisProvider>
//       <BrowserRouter>
//         <AppBridgeProvider>
//           <QueryProvider>
//             {/* <NavigationMenu
//               navigationLinks={[
//                 {
//                   label: "Configure",
//                   destination: "/configurepage",
//                 },
//               ]}
//             /> */}
//             <Frame>
//               <Routes pages={pages} />
//             </Frame>
//           </QueryProvider>
//         </AppBridgeProvider>
//       </BrowserRouter>
//     </PolarisProvider>
//   );
// }
