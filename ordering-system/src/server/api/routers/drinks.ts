// drinks CRUD router

import { eq } from "drizzle-orm";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { drinks } from "~/server/db/schema";

export const drinksRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(drinks).values({
        name: input.name,
        organisationId: ctx.session.orgId,
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(drinks).where(eq(drinks.id, input.id));
    }),
  update: protectedProcedure
    .input(z.object({ id: z.number(), name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.update(drinks).set({ name: input.name }).where(eq(drinks.id, input.id));
    }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.query.drinks.findMany({ where: eq(drinks.organisationId, ctx.session.orgId) });
  })

});