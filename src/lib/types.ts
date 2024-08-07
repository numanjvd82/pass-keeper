export type Password = {
  id: number;
  userId: number;
  passwordName: string;
  folder: string;
  username: string;
  password: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
};

export type Folder = {
  id: number;
  userId: number;
  name: string;
};
