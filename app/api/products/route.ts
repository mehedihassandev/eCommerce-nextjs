/* eslint-disable @typescript-eslint/no-explicit-any */
import connect from '@/database/db';
import Product from '@/database/models/product';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    await connect();

    const products = await Product.find();
    return NextResponse.json(products, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Internal server error', error: error.message },
      { status: 500 },
    );
  }
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    await connect();

    const newProduct = new Product(body);
    await newProduct.save();

    return NextResponse.json(
      {
        message: 'Product created successfully',
        product: newProduct,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Internal server error', error: error.message },
      { status: 500 },
    );
  }
};

export const PATCH = async (request: Request) => {
  try {
    const body = await request.json();
    const { productId, ...updateData } = body;
    await connect();

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true },
    );

    if (!updatedProduct) {
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: 'Product updated successfully',
        product: updatedProduct,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Internal server error', error: error.message },
      { status: 500 },
    );
  }
};

export const DELETE = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');
    await connect();

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: 'Product deleted successfully',
        product: deletedProduct,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Internal server error', error: error.message },
      { status: 500 },
    );
  }
};
