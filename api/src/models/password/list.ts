import { z } from "zod";
import { Password } from ".";
import { db } from "../..";
import { sql } from "../../lib/utils";

export const filterSchema = z.object({
  search: z.string().optional(),
});

type PasswordFilterSchemaType = z.infer<typeof filterSchema>;

const SELECT_CLAUSE = sql`
  SELECT  "p".id,
          "p".name as passwordName,
          "p".userId,
          "p".username,
          "p".password,
          "f".name as folder
`;

const FROM_CLAUSE = sql`
  FROM passwords "p" 
  INNER JOIN folders "f"
  ON "p".folderId = "f".id
`;

export const generateWhereClause = (filter: PasswordFilterSchemaType) => {
  const whereClause: string[] = [];

  if (filter.search && filter.search.length > 0) {
    whereClause.push(sql`"p".name LIKE '%${filter.search}%'`);
  }

  return whereClause.length > 0 ? whereClause.join(sql` AND `) : "";
};

export const listSchema = z.object({
  filter: filterSchema,
});

export type ListSchemaType = z.infer<typeof listSchema>;

export const generateListQuery = (input: ListSchemaType) => {
  const { filter } = listSchema.parse(input);
  const whereClause = generateWhereClause(filter);
  console.log("whereClause", whereClause);

  const query = sql`
    ${SELECT_CLAUSE}
    ${FROM_CLAUSE}
    ${whereClause && sql`WHERE ${whereClause}`}
  `;

  const stmt = db.prepare(query);
  return stmt.all() as Password[];
};
