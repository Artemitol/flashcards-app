"use client"

import { QuestionModel } from "@entities/question/@x/quiz"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@shared/ui/table"
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"

const columnHelper = createColumnHelper<QuestionModel>()

const columns = [
    columnHelper.accessor("id", {
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("creator.username", {
        cell: (info) => info.getValue(),
    }),
]

export function QuestionsTable({ questions }: { questions: QuestionModel[] }) {
    const table = useReactTable({
        data: questions,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <Table>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((head) => (
                            <TableHead key={head.id}>
                                {head.isPlaceholder
                                    ? null
                                    : flexRender(
                                          head.column.columnDef.header,
                                          head.getContext()
                                      )}
                            </TableHead>
                        ))}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                )}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
