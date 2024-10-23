// src/server/api/routers/orders.ts
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { orders } from "~/server/db/schema";
import { eq, desc } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";

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
      const user = await currentUser()

      if (!user) {
        throw new Error("User not found");
      }

      return ctx.db.insert(orders).values({
        userId: ctx.session.userId,
        userName: user.fullName,
        drinkId: input.drinkId,
        milkId: input.milkId,
        sugarId: input.sugarId,
        organisationId: ctx.session.orgId,
        status: "placed",
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        orderId: z.number(),
        status: z.enum(["placed", "making", "delivered"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.update(orders).set({
        status: input.status,
      }).where(eq(orders.id, input.orderId));
    }),

  // Get user's orders
  getAllForUser: protectedProcedure.query(async ({ ctx }) => {
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