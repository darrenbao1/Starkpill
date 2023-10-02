import { ApolloClient, InMemoryCache } from "@apollo/client";
import { STARKPILL_API_ENDPOINT } from "./types/constants";

const client = new ApolloClient({
	uri: STARKPILL_API_ENDPOINT,
	cache: new InMemoryCache({
		typePolicies: {
			Query: {
				fields: {
					allTokens: {
						keyArgs: false,
						merge(existing = [], incoming) {
							const uniqueIncoming = incoming.filter(
								(token: any) =>
									!existing.find((t: any) => t.__ref === token.__ref)
							);
							return [...existing, ...uniqueIncoming];
						},
					},
					allTokensByHighestFame: {
						keyArgs: false,
						merge(existing = [], incoming) {
							const uniqueIncoming = incoming.filter(
								(token: any) =>
									!existing.find((t: any) => t.__ref === token.__ref)
							);
							return [...existing, ...uniqueIncoming];
						},
					},
					allTokenByLowestFame: {
						keyArgs: false,
						merge(existing = [], incoming) {
							const uniqueIncoming = incoming.filter(
								(token: any) =>
									!existing.find((t: any) => t.__ref === token.__ref)
							);
							return [...existing, ...uniqueIncoming];
						},
					},
					allTokensByLatest: {
						keyArgs: false,
						merge(existing = [], incoming) {
							const uniqueIncoming = incoming.filter(
								(token: any) =>
									!existing.find((t: any) => t.__ref === token.__ref)
							);
							return [...existing, ...uniqueIncoming];
						},
					},
					getPostsForUser: {
						keyArgs: false,
						merge(existing = [], incoming) {
							const uniqueIncoming = incoming.filter(
								(token: any) =>
									!existing.find((t: any) => t.__ref === token.__ref)
							);
							return [...existing, ...uniqueIncoming];
						},
					},
				},
			},
		},
	}),
});

export default client;
