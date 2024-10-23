// sugar CRUD router

import { eq } from "drizzle-orm";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { sugar } from "~/server/db/schema";

export const sugarsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(sugar).values({
        name: input.name,
        organisationId: ctx.session.orgId,
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(sugar).where(eq(sugar.id, input.id));
    }),
  update: protectedProcedure
    .input(z.object({ id: z.number(), name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.update(sugar).set({ name: input.name }).where(eq(sugar.id, input.id));
    }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.query.sugar.findMany({ where: eq(sugar.organisationId, ctx.session.orgId) });
  })

});