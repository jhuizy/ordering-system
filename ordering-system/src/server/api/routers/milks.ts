// milk CRUD router

import { eq } from "drizzle-orm";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { milk } from "~/server/db/schema";

export const milksRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(milk).values({
        name: input.name,
        organisationId: ctx.session.orgId,
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(milk).where(eq(milk.id, input.id));
    }),
  update: protectedProcedure
    .input(z.object({ id: z.number(), name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.update(milk).set({ name: input.name }).where(eq(milk.id, input.id));
    }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.query.milk.findMany({ where: eq(milk.organisationId, ctx.session.orgId) });
  })

});