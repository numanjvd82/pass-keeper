import { createOne } from "./createOne";
import { findOneByEmail } from "./findOneByEmail";
import { findOneById } from "./findOneById";

export const userModel = {
  findOneByEmail,
  findOneById,
  createOne,
};
