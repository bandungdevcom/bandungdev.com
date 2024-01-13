import * as reactTable from "@tanstack/react-table"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import { Iconify } from "./iconify"

export type TDataTable<T extends Record<string, unknown>> = {
  data: T[]
  columns: reactTable.ColumnDef<T>[]
  isLoading?: boolean
}

export function DataTable<T extends Record<string, unknown>>(
  props: TDataTable<T>,
) {
  const [sorting, setSorting] = useState<reactTable.SortingState>([])

  const table = reactTable.useReactTable({
    data: props.data,
    columns: props.columns,
    getCoreRowModel: reactTable.getCoreRowModel(),
    getSortedRowModel: reactTable.getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  })
  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map(headerGroup => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map(header => {
              return (
                <TableHead key={header.id}>
                  <div
                    {...{
                      className: "flex items-center",
                      onClick: header.column.getToggleSortingHandler(),
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : reactTable.flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    {{
                      asc: (
                        <Iconify
                          icon="ph:caret-up"
                          style={{ marginLeft: "4px" }}
                        />
                      ),
                      desc: (
                        <Iconify
                          icon="ph:caret-down"
                          style={{ marginLeft: "4px" }}
                        />
                      ),
                    }[header.column.getIsSorted() as string] ?? null}
                  </div>
                </TableHead>
              )
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map(row => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>
                  {reactTable.flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext(),
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={props.columns.length}
              className="h-24 text-center"
            >
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
