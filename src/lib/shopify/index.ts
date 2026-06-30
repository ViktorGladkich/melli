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
  if (!domain) {
    console.warn('SHOPIFY_STORE_DOMAIN is not defined.');
    throw new Error('SHOPIFY_STORE_DOMAIN is not defined');
  }

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

// Frontend Product Type (matching mock-products.ts)
export interface ProductImage {
  url: string;
  altText: string;
}

export interface ProductVariant {
  id: string;
  title: string;
  price?: string;
  availableForSale?: boolean;
  selectedOptions?: { name: string; value: string }[];
}

export interface ProductOption {
  name: string;
  values: string[];
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  category: string;
  price: string;
  brand: string;
  images: ProductImage[];
  variants: ProductVariant[];
  options: ProductOption[];
  description?: string;
  material?: string;
}

// Fragment for product fields
const productFragment = `
  id
  title
  handle
  description
  vendor
  priceRange {
    minVariantPrice {
      amount
      currencyCode
    }
  }
  collections(first: 1) {
    edges {
      node {
        title
      }
    }
  }
  options {
    name
    values
  }
  variants(first: 250) {
    edges {
      node {
        id
        title
        availableForSale
        price {
          amount
          currencyCode
        }
        selectedOptions {
          name
          value
        }
      }
    }
  }
  images(first: 10) {
    edges {
      node {
        url
        altText
      }
    }
  }
`;

interface ShopifyProductNode {
  id: string;
  handle: string;
  title: string;
  vendor: string;
  description: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  collections?: {
    edges: {
      node: {
        title: string;
      };
    }[];
  };
  images: {
    edges: {
      node: {
        url: string;
        altText: string | null;
      };
    }[];
  };
  variants: {
    edges: {
      node: {
        id: string;
        title: string;
        availableForSale: boolean;
        price?: {
          amount: string;
          currencyCode: string;
        };
        selectedOptions: {
          name: string;
          value: string;
        }[];
      };
    }[];
  };
  options: {
    name: string;
    values: string[];
  }[];
}

// Helper to transform Shopify GraphQL product node to Frontend Product
function transformProduct(node: ShopifyProductNode): Product {
  const currencySymbol = node.priceRange.minVariantPrice.currencyCode === 'EUR' ? '€' : node.priceRange.minVariantPrice.currencyCode;
  const priceAmount = parseFloat(node.priceRange.minVariantPrice.amount).toFixed(2);
  
  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    category: node.collections?.edges[0]?.node?.title || "Kollektion",
    price: `${priceAmount} ${currencySymbol}`,
    brand: node.vendor || "MILLY",
    description: node.description || "",
    images: node.images.edges.map((edge) => ({
      url: edge.node.url,
      altText: edge.node.altText || node.title
    })),
    variants: node.variants.edges.map((edge) => ({
      id: edge.node.id,
      title: edge.node.title,
      price: edge.node.price ? `${parseFloat(edge.node.price.amount).toFixed(2)} ${edge.node.price.currencyCode === 'EUR' ? '€' : edge.node.price.currencyCode}` : undefined,
      availableForSale: edge.node.availableForSale,
      selectedOptions: edge.node.selectedOptions
    })),
    options: node.options.map((opt) => ({
      name: opt.name,
      values: opt.values
    }))
  };
}

export async function getProducts(limit = 50): Promise<Product[]> {
  const query = `
    query getProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            ${productFragment}
          }
        }
      }
    }
  `;

  try {
    const response = await shopifyFetch<{ data: { products: { edges: { node: ShopifyProductNode }[] } } }>({
      query,
      variables: { first: limit },
      cache: 'no-store'
    });

    return response.body.data.products.edges.map((edge) => transformProduct(edge.node));
  } catch (error) {
    console.error("Error fetching products from Shopify:", error);
    return [];
  }
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  const query = `
    query getProduct($handle: String!) {
      product(handle: $handle) {
        ${productFragment}
      }
    }
  `;

  try {
    const response = await shopifyFetch<{ data: { product: ShopifyProductNode } }>({
      query,
      variables: { handle },
      cache: 'no-store'
    });

    return response.body.data.product ? transformProduct(response.body.data.product) : null;
  } catch (error) {
    console.error(`Error fetching product ${handle} from Shopify:`, error);
    return null;
  }
}

export async function getCollectionProducts(collectionHandle: string, limit = 50): Promise<Product[]> {
  const query = `
    query getCollectionProducts($handle: String!, $first: Int!) {
      collection(handle: $handle) {
        products(first: $first) {
          edges {
            node {
              ${productFragment}
            }
          }
        }
      }
    }
  `;

  try {
    const response = await shopifyFetch<{ data: { collection: { products: { edges: { node: ShopifyProductNode }[] } } | null } }>({
      query,
      variables: { handle: collectionHandle, first: limit },
      cache: 'no-store'
    });

    if (!response.body.data.collection) {
      console.warn(`Collection ${collectionHandle} not found in Shopify.`);
      return [];
    }

    return response.body.data.collection.products.edges.map((edge) => transformProduct(edge.node));
  } catch (error) {
    console.error(`Error fetching collection ${collectionHandle} from Shopify:`, error);
    return [];
  }
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
      cache: 'force-cache'
    });
    return response.body.data.localization.availableCountries || [];
  } catch (error) {
    console.error("Error fetching localization:", error);
    return [];
  }
}

// --- CART API ---

const cartFragment = `
  id
  checkoutUrl
  totalQuantity
  cost {
    totalAmount { amount currencyCode }
  }
  lines(first: 100) {
    edges {
      node {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            price { amount currencyCode }
            image { url altText }
            product {
              title
              handle
            }
          }
        }
      }
    }
  }
`;

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  lines: {
    edges: Array<{
      node: {
        id: string;
        quantity: number;
        merchandise: {
          id: string;
          title: string;
          price: {
            amount: string;
            currencyCode: string;
          };
          image?: {
            url: string;
            altText?: string;
          };
          product: {
            title: string;
            handle: string;
          };
        };
      };
    }>;
  };
}

export async function createCart(lines: { merchandiseId: string, quantity: number }[]) {
  const query = `
    mutation cartCreate($input: CartInput) {
      cartCreate(input: $input) {
        cart {
          ${cartFragment}
        }
      }
    }
  `;

  const response = await shopifyFetch<{ data: { cartCreate: { cart: ShopifyCart } } }>({
    query,
    variables: { input: { lines } },
    cache: 'no-store'
  });
  return response.body.data.cartCreate.cart;
}

export async function addToCart(cartId: string, lines: { merchandiseId: string, quantity: number }[]) {
  const query = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          ${cartFragment}
        }
      }
    }
  `;

  const response = await shopifyFetch<{ data: { cartLinesAdd: { cart: ShopifyCart } } }>({
    query,
    variables: { cartId, lines },
    cache: 'no-store'
  });
  return response.body.data.cartLinesAdd.cart;
}

export async function updateCart(cartId: string, lines: { id: string, quantity: number }[]) {
  const query = `
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          ${cartFragment}
        }
      }
    }
  `;

  const response = await shopifyFetch<{ data: { cartLinesUpdate: { cart: ShopifyCart } } }>({
    query,
    variables: { cartId, lines },
    cache: 'no-store'
  });
  return response.body.data.cartLinesUpdate.cart;
}

export async function removeFromCart(cartId: string, lineIds: string[]) {
  const query = `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          ${cartFragment}
        }
      }
    }
  `;

  const response = await shopifyFetch<{ data: { cartLinesRemove: { cart: ShopifyCart } } }>({
    query,
    variables: { cartId, lineIds },
    cache: 'no-store'
  });
  return response.body.data.cartLinesRemove.cart;
}

export async function getCart(cartId: string) {
  const query = `
    query getCart($id: ID!) {
      cart(id: $id) {
        ${cartFragment}
      }
    }
  `;

  try {
    const response = await shopifyFetch<{ data: { cart: ShopifyCart } }>({
      query,
      variables: { id: cartId },
      cache: 'no-store'
    });
    return response.body.data.cart;
  } catch (error) {
    console.error("Error fetching cart:", error);
    return null;
  }
}
