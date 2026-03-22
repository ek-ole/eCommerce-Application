import { mockAuthResponse } from './auth-mock';
import productsData from './products-data.json';

type Product = {
  id: string;
  name: { 'en-GB': string };
  description?: { 'en-GB': string };
  masterVariant: {
    images: { url: string }[];
    prices: { value: { centAmount: number; currencyCode: string } }[];
  };
  [key: string]: unknown;
};

const createExecuteWrapper = (data: unknown) => ({
  execute: async () => {
    await Promise.resolve();
    return data;
  },
});

const createGetWrapper = (data: unknown) => ({
  get: () => createExecuteWrapper(data),
});

const createSearchWrapper = (data: unknown) => ({
  search: () => createGetWrapper(data),
});

export const mockApiRoot = {
  products: () => ({
    withId: ({ ID }: { ID: string }) => ({
      get: () => ({
        execute: async () => {
          await Promise.resolve();
          const product = (productsData as Product[]).find((p) => p.id === ID);
          return {
            body: {
              masterData: {
                current: product || {},
              },
            },
          };
        },
      }),
    }),
    get: () => ({
      execute: async () => {
        await Promise.resolve();
        return {
          body: {
            results: productsData,
            total: (productsData as Product[]).length,
            limit: 20,
            offset: 0,
          },
        };
      },
    }),
  }),
  categories: () => createGetWrapper({ body: { results: [] } }),
  productTypes: () => createGetWrapper({ body: { results: [] } }),
  productProjections: () =>
    createSearchWrapper({
      body: { results: productsData, total: (productsData as Product[]).length },
    }),
  carts: () => ({
    withId: () => ({
      post: () => createExecuteWrapper({ body: {} }),
    }),
  }),
  discountCodes: () => createGetWrapper({ body: { results: [] } }),
};

export const getMockToken = () => mockAuthResponse.access_token;
