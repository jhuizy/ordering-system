// src/server/api/routers/orders.ts
import { z } from "zod";
import { createTRPCRouter, protectedProcedureFor } from "../trpc";
import { orders } from "~/server/db/schema";
import { eq, desc, or, and } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";

export const ordersRouter = createTRPCRouter({
  create: protectedProcedureFor(["org:feature:drinker"])
    .input(
      z.object({
        drinkId: z.number(),
        milkId: z.number().nullable(),
        sugarId: z.number().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await currentUser()

      if (!user?.fullName) {
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
  update: protectedProcedureFor(["org:feature:barista"])
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

  getActiveOrderForUser: protectedProcedureFor(["org:feature:drinker"])
    .query(async ({ ctx }) => {
      return ctx.db.query.orders.findFirst({
        where: and(
          eq(orders.userId, ctx.session.userId),
          or(
            eq(orders.status, "placed"),
            eq(orders.status, "making")
          )
        ),
        with: {
          drink: true,
          milk: true,
          sugar: true,
        },
      });
    }),

  // Get user's orders
  getAllForUser: protectedProcedureFor(["org:feature:drinker"])
    .query(async ({ ctx }) => {
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
  getAllForOrg: protectedProcedureFor(["org:feature:barista"])
    .query(async ({ ctx }) => {
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