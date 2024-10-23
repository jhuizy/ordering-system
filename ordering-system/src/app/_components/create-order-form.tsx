// src/app/orders/_components/CreateOrderForm.tsx
"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { Check, Loader2 } from "lucide-react";

export function CreateOrderForm() {
  const [selectedDrink, setSelectedDrink] = useState<number | null>(null);
  const [selectedMilk, setSelectedMilk] = useState<number | null>(null);
  const [selectedSugar, setSelectedSugar] = useState<number | null>(null);

  const { data: drinks, isLoading: loadingDrinks } = api.drinks.getAll.useQuery();
  const { data: milkOptions, isLoading: loadingMilk } = api.milks.getAll.useQuery();
  const { data: sugarOptions, isLoading: loadingSugar } = api.sugars.getAll.useQuery();

  const createOrder = api.orders.create.useMutation({
    onSuccess: () => {
      // Reset form
      setSelectedDrink(null);
      setSelectedMilk(null);
      setSelectedSugar(null);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDrink) return;

    createOrder.mutate({
      drinkId: selectedDrink,
      milkId: selectedMilk,
      sugarId: selectedSugar,
    });
  };

  if (loadingDrinks || loadingMilk || loadingSugar) {
    return (
      <div className="flex h-48 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-lg bg-white p-6 shadow-sm">
      <div className="space-y-4">
        {/* Drink Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Choose your drink *
          </label>
          <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {drinks?.map((drink) => (
              <button
                key={drink.id}
                type="button"
                onClick={() => setSelectedDrink(drink.id)}
                className={`flex items-center justify-center rounded-md border p-3 text-sm focus:outline-none ${
                  selectedDrink === drink.id
                    ? "border-blue-600 bg-blue-50 text-blue-600"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <span className="mr-2">{drink.name}</span>
                {selectedDrink === drink.id && <Check className="h-4 w-4" />}
              </button>
            ))}
          </div>
        </div>

        {/* Milk Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Choose milk *
          </label>
          <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {milkOptions?.map((milk) => (
              <button
                key={milk.id}
                type="button"
                onClick={() => setSelectedMilk(milk.id === selectedMilk ? null : milk.id)}
                className={`flex items-center justify-center rounded-md border p-3 text-sm focus:outline-none ${
                  selectedMilk === milk.id
                    ? "border-blue-600 bg-blue-50 text-blue-600"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <span className="mr-2">{milk.name}</span>
                {selectedMilk === milk.id && <Check className="h-4 w-4" />}
              </button>
            ))}
          </div>
        </div>

        {/* Sugar Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Choose sugar *
          </label>
          <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {sugarOptions?.map((sugar) => (
              <button
                key={sugar.id}
                type="button"
                onClick={() => setSelectedSugar(sugar.id === selectedSugar ? null : sugar.id)}
                className={`flex items-center justify-center rounded-md border p-3 text-sm focus:outline-none ${
                  selectedSugar === sugar.id
                    ? "border-blue-600 bg-blue-50 text-blue-600"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <span className="mr-2">{sugar.name}</span>
                {selectedSugar === sugar.id && <Check className="h-4 w-4" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end space-x-4">
        <button
          type="button"
          onClick={() => {
            setSelectedDrink(null);
            setSelectedMilk(null);
            setSelectedSugar(null);
          }}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Clear selections
        </button>
        <button
          type="submit"
          disabled={!selectedDrink || !selectedMilk || !selectedSugar || createOrder.isPending}
          className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {createOrder.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Placing order...
            </>
          ) : (
            "Place Order"
          )}
        </button>
      </div>

      {createOrder.isSuccess && (
        <div className="mt-4 rounded-md bg-green-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <Check className="h-5 w-5 text-green-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-800">
                Order placed successfully!
              </p>
            </div>
          </div>
        </div>
      )}

      {createOrder.isError && (
        <div className="mt-4 rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-800">
                Failed to place order. Please try again.
              </p>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}