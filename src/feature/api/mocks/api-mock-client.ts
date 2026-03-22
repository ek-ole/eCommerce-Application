import { mockAuthResponse } from './auth-mock';
import categoriesData from './categories-data.json';
import productsData from './products-data.json';

type ProductData = {
  id: string;
  name: { 'en-GB': string };
  categories?: { typeId?: string; key?: string; id?: string }[];
  categoryKeysAndIds?: { id?: string; key?: string }[];
  description?: { 'en-GB': string };
  masterVariant: {
    images: { url: string }[];
    prices: { value: { centAmount: number; currencyCode: string } }[];
  };
  [key: string]: unknown;
};

const transformProducts = (): ProductData[] => {
  return (productsData as ProductData[]).map((product) => {
    const categoryIds = product.categoryKeysAndIds?.map((cat) => cat.id).filter(Boolean) || [];
    return {
      ...product,
      categories: categoryIds.map((id) => ({ id })),
    };
  });
};

const transformedProducts = transformProducts();

const createExecuteWrapper = (data: unknown) => ({
  execute: async () => {
    await Promise.resolve();
    return data;
  },
});

const createGetWrapper = (data: unknown) => ({
  get: () => createExecuteWrapper(data),
});

export const mockApiRoot = {
  products: () => ({
    withId: ({ ID }: { ID: string }) => ({
      get: () => ({
        execute: async () => {
          await Promise.resolve();
          const product = transformedProducts.find((p) => p.id === ID);
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
    get: () =>
      createExecuteWrapper({
        body: {
          results: transformedProducts,
          total: transformedProducts.length,
          limit: 20,
          offset: 0,
        },
      }),
  }),
  categories: () => createGetWrapper({ body: { results: categoriesData } }),
  productTypes: () => createGetWrapper({ body: { results: [] } }),
  productProjections: () => ({
    search: () => ({
      get: ({ queryArgs }: { queryArgs: { filter?: string[] } }) => ({
        execute: async () => {
          await Promise.resolve();

          let filteredProducts = [...transformedProducts];

          if (queryArgs.filter) {
            queryArgs.filter.forEach((filter: string) => {
              if (filter.includes('categories.id')) {
                const categoryId = filter.match(/"([^"]+)"/)?.[1];
                if (categoryId) {
                  filteredProducts = filteredProducts.filter((product) =>
                    product.categories?.some((cat) => cat.id === categoryId),
                  );
                }
              }
            });
          }

          return {
            body: {
              results: filteredProducts,
              total: filteredProducts.length,
            },
          };
        },
      }),
    }),
  }),
  carts: () => ({
    withId: () => ({
      post: () => createExecuteWrapper({ body: {} }),
    }),
  }),
  discountCodes: () => createGetWrapper({ body: { results: [] } }),
};

export const getMockToken = () => mockAuthResponse.access_token;
