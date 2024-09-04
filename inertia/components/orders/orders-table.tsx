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

interface OrdersTableProps {
  data: Order[];
  type: 'customer' | 'seller'
}

interface RowActionsProps {
  row: Row<Order>;
  type: 'customer' | 'seller'
}

export const RowActions = ({ row, type }: RowActionsProps) => {
  const page = type === 'customer' ? 'dashboard/history' : 'history'
  
  return (
    <div className={hstack()}>
      <Link href={`/inbox/${row.original.id}`}>
        <Button variant="ghost">
          <ChatBubblesIcon />
        </Button>
      </Link>
      <Link href={`/${page}/${row.original.id}`}>
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
function getColumns(type: 'customer' | 'seller') {
  return [
    columnHelper.accessor("id", {
      header: () => "Numéro de commande",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor(type, {
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
      cell: (props) => <RowActions type={type} row={props.row} />,
    }),
  ];
} 


export const OrdersTable = ({ data, type }: OrdersTableProps) => {
  const table = useReactTable({
    columns: getColumns(type),
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table
      className={css({
        border: "solid 2px black",
        borderRadius: "10px",
        textStyle: "body",
        borderSpacing: 0,
        borderCollapse: "revert",
        overflow: "hidden",
        bgColor: "white",
        position: "relative",
        width: "100%"
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
              <td key={cell.id} className={css({ p: "1rem" })}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
