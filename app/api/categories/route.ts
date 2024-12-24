/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';

import connect from '@/database/db';
import Category from '@/database/models/category';

export const GET = async () => {
  try {
    await connect();

    const category = await Category.find();

    return NextResponse.json(category, { status: 200 });
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

    const newCategory = new Category(body);
    await newCategory.save();

    return NextResponse.json(
      {
        message: 'Category created successfully',
        product: newCategory,
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
    const { categoryId, ...updateData } = body;
    await connect();

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      updateData,
      { new: true },
    );

    if (!updatedCategory) {
      return NextResponse.json(
        { message: 'Category not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: 'Category updated successfully',
        product: updatedCategory,
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
    const categoryId = searchParams.get('categoryId');
    await connect();

    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return NextResponse.json(
        { message: 'Category not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: 'Category deleted successfully',
        product: deletedCategory,
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
