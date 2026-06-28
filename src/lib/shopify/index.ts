const domain = process.env.SHOPIFY_STORE_DOMAIN 
  ? process.env.SHOPIFY_STORE_DOMAIN.replace(/^https?:\/\//, '').replace(/\/$/, '')
  : '';
const endpoint = `https://${domain}/api/2024-01/graphql.json`;
const storefrontToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export async function shopifyFetch<T>({
  cache = 'force-cache',
  headers,
  query,
  tags,
  variables
}: {
  cache?: RequestCache;
  headers?: HeadersInit;
  query: string;
  tags?: string[];
  variables?: Record<string, unknown>;
}): Promise<{ status: number; body: T } | never> {
  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontToken!,
        ...headers
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables })
      }),
      cache,
      ...(tags && { next: { tags } })
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body
    };
  } catch (e) {
    throw {
      error: e,
      query
    };
  }
}

export type Product = {
  id: string;
  title: string;
  handle: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  variants: {
    edges: {
      node: {
        id: string;
        title: string;
      };
    }[];
  };
  images: {
    edges: {
      node: {
        url: string;
        altText: string;
      };
    }[];
  };
  options: {
    name: string;
    values: string[];
  }[];
};

export async function getProducts(limit = 10): Promise<Product[]> {
  const query = `
    query getProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                }
              }
            }
            options {
              name
              values
            }
            images(first: 2) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch<{ data: { products: { edges: { node: Product }[] } } }>({
    query,
    variables: { first: limit },
    cache: 'no-store' // For development, bypass cache
  });

  return response.body.data.products.edges.map((edge) => edge.node);
}

export type Country = {
  name: string;
  isoCode: string;
  currency: {
    isoCode: string;
    symbol: string;
  };
};

export async function getLocalization(): Promise<Country[]> {
  const query = `
    query getLocalization {
      localization {
        availableCountries {
          name
          isoCode
          currency {
            isoCode
            symbol
          }
        }
      }
    }
  `;

  try {
    const response = await shopifyFetch<{ data: { localization: { availableCountries: Country[] } } }>({
      query,
      cache: 'no-store'
    });
    return response.body.data.localization.availableCountries || [];
  } catch (error) {
    console.error("Error fetching localization:", error);
    return [];
  }
}

