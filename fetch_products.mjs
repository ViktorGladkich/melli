async function fetchProducts() {
  try {
    const rawDomain = process.env.SHOPIFY_STORE_DOMAIN || '';
    const domain = rawDomain.replace(/^https?:\/\//, '').replace(/\/$/, '');
    
    // 1. Получаем токен
    const tokenRes = await fetch(`https://${domain}/admin/oauth/access_token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.SHOPIFY_CLIENT_ID,
        client_secret: process.env.SHOPIFY_CLIENT_SECRET
      })
    });
    
    const tokenData = await tokenRes.json();
    const token = tokenData.access_token;
    
    // 2. Делаем запрос к GraphQL
    const query = `
      query {
        products(first: 5) {
          edges {
            node {
              title
              description
              productType
            }
          }
        }
      }
    `;
    
    const res = await fetch(`https://${domain}/admin/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': token
      },
      body: JSON.stringify({ query })
    });
    
    const json = await res.json();
    console.log(JSON.stringify(json, null, 2));
  } catch(e) {
    console.error(e);
  }
}

fetchProducts();
