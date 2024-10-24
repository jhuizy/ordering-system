// sugar CRUD router

import { eq } from "drizzle-orm";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedureFor,
} from "~/server/api/trpc";
import { sugar } from "~/server/db/schema";

export const sugarsRouter = createTRPCRouter({
  create: protectedProcedureFor(["org:feature:admin"])
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(sugar).values({
        name: input.name,
        organisationId: ctx.session.orgId,
      });
    }),
  delete: protectedProcedureFor(["org:feature:admin"])
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(sugar).where(eq(sugar.id, input.id));
    }),
  update: protectedProcedureFor(["org:feature:admin"])
    .input(z.object({ id: z.number(), name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.update(sugar).set({ name: input.name }).where(eq(sugar.id, input.id));
    }),
  getAll: protectedProcedureFor(["org:feature:drinker"])
    .query(async ({ ctx }) => {
      return ctx.db.query.sugar.findMany({ where: eq(sugar.organisationId, ctx.session.orgId) });
    })
});