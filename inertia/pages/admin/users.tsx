import { AdminLayout } from "~/components/layout/admin-layout"
import Card from "~/components/ui/card";
import { vstack } from "~/styled-system/patterns";
import { UsersTable } from "./components/users-table";
import { css } from "~/styled-system/css";
import { ControllerProps, User } from "~/types";

interface Props {
  users: User[]
}

export default function Users(props: Props) {
  const { users } = props    

  return (
    <Card css={{ width: "100%", height: "100%" }}>
      <div
        className={vstack({
          w: "100%",
          alignItems: "flex-start",
          p: "1rem",
          height: "100%",
        })}
      >
        <h2 className={css({ textStyle: "subtitle" })}>Utilisateurs</h2>
        {users && <UsersTable data={users} />}
      </div>
    </Card>
  );
}

Users.layout = page => (
  <AdminLayout children={page} />
)