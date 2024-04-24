/* eslint-disable react/no-unescaped-entities */
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FilePenLine, MoreHorizontal, Trash, View } from "lucide-react"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { Resource } from "@/src/types/resource"
import Link from "next/link"

export const columns: ColumnDef<Resource>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return <DataTableColumnHeader className="pl-3" column={column} title="Nom de la resource" />
        },
        cell: ({ row }) => <div className="pl-3">{row.getValue("name")}</div>,
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Créé le" />
        },
        cell: ({ row }) => {
            const date = new Date(row.getValue('createdAt'))
            const formattedDate = date.toLocaleDateString()
            return <div>{formattedDate}</div>
        }
    },
    {
        accessorKey: "updatedAt",
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Mis à jour le" />
        },
        cell: ({ row }) => {
            const date = new Date(row.getValue('updatedAt'))
            const formattedDate = date.toLocaleDateString()
            return <div>{formattedDate}</div>
        }
    },
    // Actions column for add dropdown menu for each row
    {
        id: "actions",
        cell: ({ row }) => {
            const resource = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <Link href={`/dashboard/resource/${resource.name}`} >
                            <DropdownMenuItem>
                                <View className="h-4 w-4 mr-2" />
                                Apperçu
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]


