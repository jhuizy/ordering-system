import { relations, sql } from "drizzle-orm";
import {
  index,
  int,
  sqliteTableCreator,
  text,
} from "drizzle-orm/sqlite-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `ordering-system_${name}`);

export const posts = createTable(
  "post",
  {
    id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    name: text("name", { length: 256 }),
    createdById: text("created_by", { length: 255 })
      .notNull(),
    createdAt: int("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: int("updatedAt", { mode: "timestamp" }).$onUpdate(
      () => new Date()
    ),
  },
  (example) => ({
    createdByIdIdx: index("created_by_idx").on(example.createdById),
    nameIndex: index("name_idx").on(example.name),
  })
);

export const drinks = createTable("drink", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  organisationId: text("organisation_id").notNull(),
  createdAt: int("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: int("updatedAt", { mode: "timestamp" }).$onUpdate(
      () => new Date())
});

export const milk = createTable("milk", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  organisationId: text("organisation_id").notNull(),
  createdAt: int("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: int("updatedAt", { mode: "timestamp" }).$onUpdate(
      () => new Date())
});

export const sugar = createTable("sugar", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  organisationId: text("organisation_id").notNull(),
  createdAt: int("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: int("updatedAt", { mode: "timestamp" }).$onUpdate(
      () => new Date())
});

export const orders = createTable("order", {
  id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  userId: text("user_id").notNull(),
  userName: text("user_name").notNull(),
  drinkId: int("drink_id").notNull().references(() => drinks.id),
  milkId: int("milk_id").references(() => milk.id),
  sugarId: int("sugar_id").references(() => sugar.id),
  status: text("status", { enum: ["placed", "making", "delivered"] }).notNull().default("placed"),
  organisationId: text("organisation_id").notNull(),
  createdAt: int("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: int("updatedAt", { mode: "timestamp" }).$onUpdate(
      () => new Date())
});

// Define relations
export const ordersRelations = relations(orders, ({ one }) => ({
  drink: one(drinks, {
    fields: [orders.drinkId],
    references: [drinks.id],
  }),
  milk: one(milk, {
    fields: [orders.milkId],
    references: [milk.id],
  }),
  sugar: one(sugar, {
    fields: [orders.sugarId],
    references: [sugar.id],
  }),
}));