// drinks CRUD router

import { eq } from "drizzle-orm";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedureFor,
} from "~/server/api/trpc";
import { drinks } from "~/server/db/schema";

export const drinksRouter = createTRPCRouter({
  create: protectedProcedureFor(["org:feature:admin"])
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(drinks).values({
        name: input.name,
        organisationId: ctx.session.orgId,
      });
    }),
  delete: protectedProcedureFor(["org:feature:admin"])
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(drinks).where(eq(drinks.id, input.id));
    }),
  update: protectedProcedureFor(["org:feature:admin"])
    .input(z.object({ id: z.number(), name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.update(drinks).set({ name: input.name }).where(eq(drinks.id, input.id));
    }),
  getAll: protectedProcedureFor(["org:feature:drinker"])
    .query(async ({ ctx }) => {
      return ctx.db.query.drinks.findMany({ where: eq(drinks.organisationId, ctx.session.orgId) });
    })

});