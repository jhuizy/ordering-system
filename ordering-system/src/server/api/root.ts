import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { drinksRouter } from "./routers/drinks";
import { sugarsRouter } from "./routers/sugars";
import { milksRouter } from "./routers/milks";
import { ordersRouter } from "./routers/orders";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  drinks: drinksRouter,
  sugars: sugarsRouter,
  milks: milksRouter,
  orders: ordersRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
