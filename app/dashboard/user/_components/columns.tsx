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
import { MoreHorizontal, View } from "lucide-react"
import { User } from "@/src/types/user"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import Link from "next/link"

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => {
            return <DataTableColumnHeader className="pl-3" column={column} title="ID" />
        },
        cell: ({ row }) => <div className="pl-3">{row.getValue("id")}</div>,
    },
    {
        accessorKey: "username",
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Nom d'utilisateur" />
        },
        cell: ({ row }) => <div className="w-[80px]">{row.getValue("username")}</div>,
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Email" />
        }
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
    {
        accessorKey: "role_name",
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Rôle" />
        },
    },
    // Actions column for add dropdown menu for each row
    {
        id: "actions",
        cell: ({ row }) => {
            const user = row.original

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
                        <DropdownMenuSeparator />
                        <Link href={`/dashboard/user/${user.id}`}>
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


