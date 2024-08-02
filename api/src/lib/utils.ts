import { z } from "zod";

export const sql = String.raw;

export const paginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().default(10),
});

export type PaginationSchemaType = z.infer<typeof paginationSchema>;

export const generatePaginationClause = ({
  page,
  limit,
}: PaginationSchemaType) => {
  return `LIMIT ${limit} OFFSET ${(page - 1) * limit}`;
};

export enum OrderBy {
  ASC = "ASC",
  DESC = "DESC",
}

export const orderBySchema = z.object({
  orderBy: z.string(),
  direction: z.nativeEnum(OrderBy).default(OrderBy.ASC),
});

export type OrderBySchemaType = z.infer<typeof orderBySchema>;

export const generateOrderByClause = ({
  orderBy,
  direction,
}: OrderBySchemaType) => {
  return `ORDER BY ${orderBy} ${direction}`;
};
