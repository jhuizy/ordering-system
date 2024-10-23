// src/server/api/routers/orders.ts
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { orders } from "~/server/db/schema";
import { eq, desc } from "drizzle-orm";

export const ordersRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        drinkId: z.number(),
        milkId: z.number().nullable(),
        sugarId: z.number().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.insert(orders).values({
        userId: ctx.session.userId,
        drinkId: input.drinkId,
        milkId: input.milkId,
        sugarId: input.sugarId,
        organisationId: ctx.session.orgId,
        status: "placed",
      });
    }),

  // Get user's orders
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.query.orders.findMany({
      where: eq(orders.userId, ctx.session.userId),
      orderBy: [desc(orders.createdAt)],
      with: {
        drink: true,
        milk: true,
        sugar: true,
      },
    });
  }),

  // Get all orders for the organization (for baristas)
  getAllForOrg: protectedProcedure.query(async ({ ctx }) => {
    // You might want to check if user is barista here
    return ctx.db.query.orders.findMany({
      where: eq(orders.organisationId, ctx.session.orgId),
      orderBy: [desc(orders.createdAt)],
      with: {
        drink: true,
        milk: true,
        sugar: true,
      },
    });
  }),
});