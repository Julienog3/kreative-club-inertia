import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { css } from "~/styled-system/css";
import { OrderProduct } from "~/types/order";

interface QuoteTableProps {
  data: OrderProduct[];
}
const columnHelper = createColumnHelper<OrderProduct>();
const columns = [
  columnHelper.accessor("name", {
    header: () => "Article",
    cell: (info) => (
      <span className={css({ fontWeight: "bold" })}>{info.getValue()}</span>  
    ),
  }),
  columnHelper.accessor("details", {
    header: () => "Détails",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("quantity", {
    header: () => "Qté.",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("duration", {
    header: () => "Durée",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("price", {
    header: () => "Prix",
    cell: (info) => info.getValue(),
  }),
];

export const QuoteTable = ({ data }: QuoteTableProps) => {
  const table = useReactTable({
    columns,
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
