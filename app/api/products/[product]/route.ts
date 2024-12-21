/* eslint-disable @typescript-eslint/no-explicit-any */
import connect from '@/database/db';
import Product from '@/database/models/product';
import { Types } from 'mongoose';
import { NextResponse } from 'next/server';

export const GET = async (request: Request, context: { params: any }) => {
  const productId = context.params.product;

  try {
    if (!productId || !Types.ObjectId.isValid(productId)) {
      return NextResponse.json(
        { message: 'Product ID not found' },
        { status: 400 },
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

    return NextResponse.json(product.toObject(), { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Internal server error', error: error.message },
      { status: 500 },
    );
  }
};
