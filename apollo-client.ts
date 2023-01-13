import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://orca-app-c3df4.ondigitalocean.app/starkpill-api2/graphql",
    cache: new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
              allTokens: {
                keyArgs: false,
                merge(existing = [], incoming) {
                  const uniqueIncoming = incoming.filter(
                    (token:any) => !existing.find((t:any) => t.__ref === token.__ref)
                  );
                  return [...existing, ...uniqueIncoming];
                },
              }
            }
          }
        }
      }),
});

export default client;