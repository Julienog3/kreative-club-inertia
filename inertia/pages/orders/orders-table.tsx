import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "~/components/ui/button";
import { css } from "~/styled-system/css";
import { hstack } from "~/styled-system/patterns";
import { Order, OrderStep } from "~/types/order";
import ChatBubblesIcon from "~/assets/icons/chat-bubbles.svg?react"
import DocumentTextIcon from "~/assets/icons/document-text.svg?react"
import { Link } from "@inertiajs/react";
import Chip from "~/components/ui/chip";
import { Step } from "#models/order_step";
import { Tooltip } from "~/components/ui/tooltip";

interface OrdersTableProps {
  data: Order[];
}

interface RowActionsProps {
  row: Row<Order>;
}

export const RowActions = ({ row }: RowActionsProps) => {
  return (
    <div className={hstack()}>
      <Link href={`/inbox/${row.original.id}`}>
        <Button variant="ghost">
          <ChatBubblesIcon />
        </Button>
      </Link>
      <Link href={`dashboard/${row.original.id}`}>
        <Button variant="ghost">
          <DocumentTextIcon />
        </Button>
      </Link>
    </div>
  );
};

const getCurrentStep = (steps: OrderStep[]) => steps.reduce((acc, curr) => {
  return new Date(curr.createdAt) > new Date(acc.createdAt) ? curr : acc;
}, steps[0]);

const columnHelper = createColumnHelper<Order>();
const columns = [
  columnHelper.accessor("id", {
    header: () => "Numéro de commande",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("customer", {
    header: () => "Client",
    cell: (info) => <div className={hstack()}>
      {info.getValue().avatar && <img
        className={css({
          border: "solid 2px #000",
          borderRadius: "5px",
          width: "2.5rem",
          height: "2.5rem",
        })}
        src={info.getValue().avatar ?? ''}
        alt=""
      />}
      <p className={css({ textStyle: "body" })}>{info.getValue().firstName} {info.getValue().lastName}</p>
    </div>,
  }),
  columnHelper.accessor("steps", {
    header: () => "Status",
    cell: (info) => <Chip>{getCurrentStep(info.getValue() as OrderStep[]).name}</Chip>,
  }),
  columnHelper.accessor("createdAt", {
    header: () => "Date de création",
    cell: (info) => new Date(info.getValue()).toLocaleString(),
  }),
  columnHelper.display({
    id: "actions",
    cell: (props) => <RowActions row={props.row} />,
  }),
];

export const OrdersTable = ({ data }: OrdersTableProps) => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <table
        className={css({
          border: "solid 2px black",
          borderRadius: "10px",
          textStyle: "body",
          borderSpacing: 0,
          borderCollapse: "revert",
          overflow: "hidden",
          bgColor: "white",
          position: "relative"
        })}
      >
        <thead className={css({  w: "100%", backgroundColor: "yellow" })}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className={css({ p: "1rem", w: "100%", borderBottom: "2px solid black" })}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className={css({ p: "1rem", textAlign: "left" })}>
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
