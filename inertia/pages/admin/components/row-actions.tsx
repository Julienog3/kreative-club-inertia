import { Button } from "~/components/ui/button";
import { hstack } from "~/styled-system/patterns";
import { User } from "~/types";
import { Row } from "@tanstack/react-table";

interface RowActionsProps {
  row: Row<User>;
}

export const RowActions = ({ row }: RowActionsProps) => {
  return (
    <div className={hstack()}>
      <Button>Editer</Button>
      <Button variant="danger">Supprimer</Button>
    </div>
  );
};
