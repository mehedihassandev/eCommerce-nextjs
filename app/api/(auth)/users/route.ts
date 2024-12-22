/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';

import { Types } from 'mongoose';

import connect from '@/database/db';
import User from '@/database/models/user';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const ObjectId = require('mongoose').Types.ObjectId;

export const GET = async () => {
  try {
    await connect();

    const users = await User.find();

    return NextResponse.json(users, { status: 200 });
  } catch (error: any) {
    return new NextResponse('Internal server error' + error.message, {
      status: 500,
    });
  }
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    await connect();

    const newUser = new User(body);
    await newUser.save();

    return NextResponse.json(
      { message: 'User created successfully', user: newUser },
      { status: 200 },
    );
  } catch (error: any) {
    return new NextResponse('Internal server error' + error.message, {
      status: 500,
    });
  }
};

export const PATCH = async (request: Request) => {
  try {
    const body = await request.json();
    const { userId, newUsername } = body;

    await connect();

    if (!userId || !newUsername) {
      return new NextResponse('ID or newUsername for found!', { status: 400 });
    }

    if (!Types.ObjectId.isValid(userId)) {
      return new NextResponse('Invalid User ID!', { status: 400 });
    }

    const updateUser = await User.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { username: newUsername },
      { new: true },
    );

    if (!updateUser) {
      return new NextResponse('User not found!', { status: 404 });
    }

    return NextResponse.json(
      {
        message: 'User updated successfully',
        user: updateUser,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return new NextResponse('Internal server error' + error.message, {
      status: 500,
    });
  }
};

export const DELETE = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return new NextResponse('ID not found!', { status: 400 });
    }

    if (!Types.ObjectId.isValid(userId)) {
      return new NextResponse('Invalid User ID!', { status: 400 });
    }

    await connect();

    const deletedUser = await User.findByIdAndDelete(
      new Types.ObjectId(userId),
    );

    if (!deletedUser) {
      return new NextResponse('User not found!', { status: 404 });
    }

    return NextResponse.json(
      {
        message: 'User deleted successfully',
        user: deletedUser,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return new NextResponse('Internal server error' + error.message, {
      status: 500,
    });
  }
};
