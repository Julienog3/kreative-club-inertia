export type State = "danger" | "success" | "warning";

export type User = {
  id: string
  username: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  avatar: string | null
}