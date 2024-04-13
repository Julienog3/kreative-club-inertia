// import { User } from "#root/src/api/user";
// import { css } from "#root/styled-system/css";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Chip from "~/components/ui/chip";
import { User } from "~/types";
import { RowActions } from "./row-actions";
import { css } from "~/styled-system/css";
// import { RowActions } from "./RowActions";
// import Chip from "#root/src/components/utils/Chip/Chip";

interface UsersTableProps {
  data: User[];
}

const columnHelper = createColumnHelper<User>();
const columns = [
  columnHelper.accessor("username", {
    header: () => "Nom d'utilisateur",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("firstName", {
    header: () => "Prénom",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("lastName", {
    header: () => "Nom",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("email", {
    header: () => "E-mail",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("role", {
    header: () => "Rôle",
    cell: (info) => <Chip>{info.getValue()}</Chip>,
  }),
  columnHelper.display({
    id: "actions",
    cell: (props) => <RowActions row={props.row} />,
  }),
];

export const UsersTable = ({ data }: UsersTableProps) => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <table
        className={css({
          // border: "solid 3px black",
          borderRadius: "10px",
          textStyle: "body",
          // borderSpacing: 0,
          borderCollapse: "separate",
          // overflow: "hidden",
        })}
      >
        <thead className={css({ borderBottom: "3px solid black" })}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className={css({ p: "1rem" })}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className={css({ p: ".5rem" })}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className={css({
                borderBottom: "3px solid black",
              })}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={css({ p: ".5rem" })}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
