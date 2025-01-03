/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';

import connect from '@/database/db';
import Category from '@/database/models/category';
import Product from '@/database/models/product';

export const GET = async (request: Request) => {
  try {
    await connect();

    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const categoryName = searchParams.get('categoryName');
    const limit = searchParams.get('limit');
    const offset = searchParams.get('offset');
    const name = searchParams.get('name');
    const brand = searchParams.get('brand');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const isLatestFirst = searchParams.get('isLatestFirst') === 'true';
    const sort = searchParams.get('sort');

    if (!limit || !offset) {
      return NextResponse.json(
        { message: 'limit and offset are required query parameters' },
        { status: 400 },
      );
    }

    const limitValue = parseInt(limit, 10);
    const offsetValue = parseInt(offset, 10);

    const query: any = {};

    if (categoryId || categoryName) {
      const categoryQuery = [];
      if (categoryId) {
        categoryQuery.push({ _id: categoryId });
      }
      if (categoryName) {
        categoryQuery.push({ name: categoryName });
      }

      const categories = await Category.find({ $or: categoryQuery });
      const categoryIds = categories.map((category) => category._id);

      query.categories = { $in: categoryIds };
    }

    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }

    if (minPrice || maxPrice) {
      query['price.totalAmount.value'] = {};
      if (minPrice) {
        query['price.totalAmount.value'].$gte = parseFloat(minPrice);
      }
      if (maxPrice) {
        query['price.totalAmount.value'].$lte = parseFloat(maxPrice);
      }
    }

    if (brand) {
      query.brand = { $regex: brand, $options: 'i' };
    }

    const totalCount = await Product.countDocuments(query);

    let productsQuery = Product.find(query)
      .populate('categories')
      .skip(offsetValue)
      .limit(limitValue);

    // Sort by creation date or price based on parameters
    if (isLatestFirst) {
      productsQuery = productsQuery.sort({ createdAt: -1 });
    } else if (sort === 'priceAsc') {
      productsQuery = productsQuery.sort({ 'price.totalAmount.value': 1 });
    } else if (sort === 'priceDesc') {
      productsQuery = productsQuery.sort({ 'price.totalAmount.value': -1 });
    } else {
      productsQuery = productsQuery.sort({ createdAt: 1 });
    }

    const products = await productsQuery;

    return NextResponse.json(
      { products, totalCount, limit: limitValue, offset: offsetValue },
      { status: 200 },
    );
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
