

const SHOP = process.env.SHOPIFY_STORE_DOMAIN;
const CLIENT_ID = process.env.SHOPIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET;

async function getAdminToken() {
  const response = await fetch(`https://${SHOP}/admin/oauth/access_token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }),
  });
  if (!response.ok) throw new Error(`Token request failed: ${response.status} ${await response.text()}`);
  const data = await response.json();
  return data.access_token;
}

async function getStorefrontToken(adminToken) {
  const query = `
    mutation storefrontAccessTokenCreate($input: StorefrontAccessTokenInput!) {
      storefrontAccessTokenCreate(input: $input) {
        storefrontAccessToken {
          accessToken
        }
        userErrors {
          field
          message
        }
      }
    }
  `;
  const response = await fetch(`https://${SHOP}/admin/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': adminToken,
    },
    body: JSON.stringify({
      query,
      variables: { input: { title: 'NextJS Storefront' } },
    }),
  });
  if (!response.ok) throw new Error(`GraphQL request failed: ${response.status}`);
  const data = await response.json();
  return data;
}

async function main() {
  try {
    const adminToken = await getAdminToken();
    console.log("Admin token acquired successfully.");
    const sfTokenData = await getStorefrontToken(adminToken);
    
    if (sfTokenData.data?.storefrontAccessTokenCreate?.storefrontAccessToken?.accessToken) {
      const token = sfTokenData.data.storefrontAccessTokenCreate.storefrontAccessToken.accessToken;
      console.log("\\n=== YOUR STOREFRONT API TOKEN ===");
      console.log(token);
      console.log("=================================\\n");
    } else {
      console.log("Failed to extract token. Response:", JSON.stringify(sfTokenData, null, 2));
    }
  } catch (err) {
    console.error("Error:", err);
  }
}
main();
