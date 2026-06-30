import { NextRequest, NextResponse } from 'next/server';
import { createCart, addToCart, updateCart, removeFromCart, getCart } from '@/lib/shopify';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const cartId = searchParams.get('cartId');

  if (!cartId) {
    return NextResponse.json({ error: 'Missing cartId' }, { status: 400 });
  }

  try {
    const cart = await getCart(cartId);
    return NextResponse.json(cart);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cartId, lines } = body;

    if (cartId) {
      // Add to existing cart
      const cart = await addToCart(cartId, lines);
      return NextResponse.json(cart);
    } else {
      // Create new cart
      const cart = await createCart(lines);
      return NextResponse.json(cart);
    }
  } catch (error) {
    console.error("Cart POST error:", error);
    return NextResponse.json({ error: 'Failed to add to cart' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { cartId, lines } = body;

    if (!cartId || !lines) {
      return NextResponse.json({ error: 'Missing cartId or lines' }, { status: 400 });
    }

    const cart = await updateCart(cartId, lines);
    return NextResponse.json(cart);
  } catch (error) {
    console.error("Cart PUT error:", error);
    return NextResponse.json({ error: 'Failed to update cart' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { cartId, lineIds } = body;

    if (!cartId || !lineIds) {
      return NextResponse.json({ error: 'Missing cartId or lineIds' }, { status: 400 });
    }

    const cart = await removeFromCart(cartId, lineIds);
    return NextResponse.json(cart);
  } catch (error) {
    console.error("Cart DELETE error:", error);
    return NextResponse.json({ error: 'Failed to remove from cart' }, { status: 500 });
  }
}
