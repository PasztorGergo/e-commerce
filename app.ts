import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import * as Realm from "realm-web";

export const app = new Realm.App({ id: process.env.APP_ID });
export const credentials = Realm.Credentials.anonymous();

export const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.GQL_URL,
    fetch: async (uri, options) => {
      //@ts-ignore
      options.headers.Authorization = `Bearer ${app.currentUser?.accessToken}`;
      return fetch(uri, options);
    },
  }),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: "no-cache",
    },
  },
});
