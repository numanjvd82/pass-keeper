export type Password = {
  id: number;
  userId: number;
  name: string;
  folderId: number;
  username: string;
  password: string;
  uri?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type User = {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export type InputType =
  | "text"
  | "password"
  | "comment"
  | "select"
  | "number"
  | "email"
  | "checkbox";

export type Folder = {
  id: number;
  userId: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};
