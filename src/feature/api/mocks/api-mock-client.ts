import { mockAuthResponse } from './auth-mock';
import categoriesData from './categories-data.json';
import productTypesData from './product-types-data.json';
import productsData from './products-data.json';

type ProductTypeData = {
  id: string;
  name: string;
};

type RawProduct = {
  id: string;
  name: { 'en-GB': string };
  categories?: { typeId?: string; key?: string; id?: string }[];
  categoryKeysAndIds?: { id?: string; key?: string }[];
  description?: { 'en-GB': string };
  productType?: { key: string; typeId: string };
  masterVariant: {
    images: { url: string }[];
    prices: { value: { centAmount: number; currencyCode: string } }[];
  };
  [key: string]: unknown;
};

type ProductData = {
  id: string;
  name: { 'en-GB': string };
  categories?: { id: string }[];
  description?: { 'en-GB': string };
  productType?: { key: string; typeId: string; obj?: { name: string } };
  masterVariant: {
    images: { url: string }[];
    prices: { value: { centAmount: number; currencyCode: string } }[];
  };
  [key: string]: unknown;
};

const transformProducts = (): ProductData[] => {
  const rawProducts = productsData as RawProduct[];

  return rawProducts.map((product) => {
    const categoryIds =
      product.categoryKeysAndIds?.map((cat) => cat.id).filter((id): id is string => Boolean(id)) ||
      [];

    let productTypeObj;
    if (product.productType?.key) {
      const foundType = productTypesData.find(
        (type: ProductTypeData) => type.id === product.productType?.key,
      );
      if (foundType) {
        productTypeObj = { name: foundType.name };
      }
    }

    const transformedProduct: ProductData = {
      id: product.id,
      name: product.name,
      description: product.description,
      masterVariant: product.masterVariant,
      categories: categoryIds.map((id) => ({ id })),
      productType: product.productType
        ? {
            key: product.productType.key,
            typeId: product.productType.typeId,
            obj: productTypeObj,
          }
        : undefined,
    };

    return transformedProduct;
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
  productTypes: () => createGetWrapper({ body: { results: productTypesData } }),
  productProjections: () => ({
    search: () => ({
      get: ({ queryArgs }: { queryArgs: { filter?: string[]; sort?: string[] } }) => ({
        execute: async () => {
          await Promise.resolve();

          let filteredProducts = [...transformedProducts];

          if (queryArgs.filter) {
            queryArgs.filter.forEach((filter: string) => {
              if (filter.includes('categories.id')) {
                const match = filter.match(/"([^"]+)"/);
                const categoryId = match ? match[1] : null;
                if (categoryId) {
                  filteredProducts = filteredProducts.filter((product) =>
                    product.categories?.some((cat) => cat.id === categoryId),
                  );
                }
              }

              if (filter.includes('productType.id')) {
                const match = filter.match(/"([^"]+)"/);
                const typeId = match ? match[1] : null;
                if (typeId) {
                  filteredProducts = filteredProducts.filter(
                    (product) => product.productType?.key === typeId,
                  );
                }
              }
            });
          }

          if (queryArgs.sort && queryArgs.sort.length > 0) {
            const sortOption = queryArgs.sort[0];
            if (sortOption === 'price asc') {
              filteredProducts.sort((a, b) => {
                const priceA = a.masterVariant.prices[0]?.value.centAmount || 0;
                const priceB = b.masterVariant.prices[0]?.value.centAmount || 0;
                return priceA - priceB;
              });
            } else if (sortOption === 'price desc') {
              filteredProducts.sort((a, b) => {
                const priceA = a.masterVariant.prices[0]?.value.centAmount || 0;
                const priceB = b.masterVariant.prices[0]?.value.centAmount || 0;
                return priceB - priceA;
              });
            } else if (sortOption === 'name asc') {
              filteredProducts.sort((a, b) => a.name['en-GB'].localeCompare(b.name['en-GB']));
            } else if (sortOption === 'name desc') {
              filteredProducts.sort((a, b) => b.name['en-GB'].localeCompare(a.name['en-GB']));
            }
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
