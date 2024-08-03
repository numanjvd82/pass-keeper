import { z } from "zod";
import { Password } from ".";
import { db } from "../..";
import { sql } from "../../lib/utils";

export const schema = z.object({
  search: z.string().nullish(),
});

type PasswordSchemaType = z.infer<typeof schema>;

export const generateWhereClause = ({ search }: PasswordSchemaType) => {
  const whereClause = [];
  if (search) {
    whereClause.push(`name LIKE '%${search}%'`);
  }
  if (whereClause.length === 0) {
    return;
  }
  return whereClause.join(" AND ");
};

export const listSchema = z.object({
  filter: schema,
});

export type ListSchemaType = z.infer<typeof listSchema>;

export const generateListQuery = (input: ListSchemaType) => {
  const { filter } = listSchema.parse(input);
  const whereClause = generateWhereClause(filter);
  console.log(whereClause);

  const query = sql`
    SELECT *
    FROM passwords
    ${whereClause && sql`WHERE ${whereClause}`}
  `;

  const stmt = db.prepare(query);
  return stmt.all() as Password[];
};
