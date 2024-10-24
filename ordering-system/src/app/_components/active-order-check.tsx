"use client"
import React from 'react';
import { api } from '~/trpc/react';

const ActiveOrderCheck = () => {
  const { data: order, isLoading, error } = api.orders.getActiveOrderForUser.useQuery()


  if (isLoading) {
    return <div className="w-full max-w-md mx-auto py-4">Loading...</div>;
  }

  if (error) {
    return (
      <div className="mt-4 rounded-md bg-red-50 p-4">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm text-red-800">
              Something went wrong while checking for an active order
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (order) {
    return (
      <div className="mt-4 rounded-md bg-yellow-50 p-4">
        <div className="flex justify-between items-center">
          <div className="ml-3">
            <p className="text-sm text-yellow-800">
              You already have an active order
            </p>
          </div>
          <a
            href="/history"
            className="ml-3 text-sm font-medium text-yellow-800 hover:text-yellow-700 underline"
          >
            View your orders →
          </a>
        </div>
      </div>
    );
  }
};

export default ActiveOrderCheck;