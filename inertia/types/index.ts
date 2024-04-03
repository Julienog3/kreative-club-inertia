
export type State = "danger" | "success" | "warning";

export interface BaseModel {
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface User extends BaseModel {
  username: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  avatar: string | null
}

export interface AuthenticatedPageProps extends Page<PageProps>{}