import { z } from "zod";
import { Password } from ".";
import { db } from "../..";
import { sql } from "../../dbInit";

export const schema = z.object({
  search: z.string().nullish(),
});

type PasswordSchemaType = z.infer<typeof schema>;

export const generateWhereClause = ({ search }: PasswordSchemaType) => {
  const whereClause = [];
  if (search) {
    whereClause.push(`name LIKE '%${search}%'`);
  }
  return whereClause.length ? whereClause.join(" AND ") : "";
};

export const listSchema = z.object({
  filter: schema,
});

export type ListSchemaType = z.infer<typeof listSchema>;

export const generateListQuery = ({ filter }: ListSchemaType) => {
  const { filter: parsedFilter } = listSchema.parse(filter);
  const whereClause = generateWhereClause(parsedFilter);

  const query = sql`
    SELECT *
    FROM passwords
    ${sql`WHERE ${whereClause}`}
  `;

  const stmt = db.prepare(query);
  return stmt.all() as Password[];
};
