/* eslint-disable @typescript-eslint/no-explicit-any */
import connect from '@/lib/database/db';
import Product from '@/lib/database/modals/product';
import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('id');

    if (!productId) {
      return NextResponse.json(
        { message: 'Product ID is required' },
        { status: 404 },
      );
    }

    await connect();

    const product = await Product.findById(productId);

    if (!product) {
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Internal server error', error: error.message },
      { status: 500 },
    );
  }
};
