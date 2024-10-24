"use client";

import { api } from "~/trpc/react";
import { OptionManager } from "./options-manager";
import { Protect } from "@clerk/nextjs";

export default function Settings() {
  const { data: drinks, refetch: refetchDrinks } = api.drinks.getAll.useQuery();
  const addDrink = api.drinks.create.useMutation({
    onSuccess: () => refetchDrinks()
  });
  const deleteDrink = api.drinks.delete.useMutation({
    onSuccess: () => refetchDrinks(),
  });
  const editDrink = api.drinks.update.useMutation({
    onSuccess: () => refetchDrinks(),
  });

  const { data: sugars, refetch: refetchSugars } = api.sugars.getAll.useQuery();
  const addSugar = api.sugars.create.useMutation({
    onSuccess: () => refetchSugars()
  });
  const deleteSugar = api.sugars.delete.useMutation({
    onSuccess: () => refetchSugars(),
  });
  const editSugar = api.sugars.update.useMutation({
    onSuccess: () => refetchSugars(),
  });

  const { data: milks, refetch: refetchMilks } = api.milks.getAll.useQuery();
  const addMilk = api.milks.create.useMutation({
    onSuccess: () => refetchMilks()
  });
  const deleteMilk = api.milks.delete.useMutation({
    onSuccess: () => refetchMilks(),
  });
  const editMilk = api.milks.update.useMutation({
    onSuccess: () => refetchMilks(),
  });


  return (
    <Protect permission="org:feature:admin">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <OptionManager
          title="Available Drinks"
          options={drinks ?? []}
          onAdd={(name) => addDrink.mutateAsync({ name })}
          onDelete={(id) => deleteDrink.mutateAsync({ id })}
          onEdit={(id, name) => editDrink.mutateAsync({ id, name })}
        />
        <OptionManager
          title="Available Sugars"
          options={sugars ?? []}
          onAdd={(name) => addSugar.mutateAsync({ name })}
          onDelete={(id) => deleteSugar.mutateAsync({ id })}
          onEdit={(id, name) => editSugar.mutateAsync({ id, name })}
        />
        <OptionManager
          title="Available Milks"
          options={milks ?? []}
          onAdd={(name) => addMilk.mutateAsync({ name })}
          onDelete={(id) => deleteMilk.mutateAsync({ id })}
          onEdit={(id, name) => editMilk.mutateAsync({ id, name })}
        />
      </div>
    </Protect>
  );
}