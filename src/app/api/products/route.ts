import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/shopify';

export async function GET() {
  try {
    const products = await getProducts(100);
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error in products API route:", error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
export const revalidate = 60; // Cache the API response for 1 minute
