/* eslint-disable react/no-unescaped-entities */
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, View } from "lucide-react"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { Building } from "@/src/types/building"
import Link from "next/link"

export const columns: ColumnDef<Building>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return <DataTableColumnHeader className="pl-3" column={column} title="Nom du batiment" />
        },
        cell: ({ row }) => <div className="pl-3">{row.getValue("name")}</div>,
    },
    {
        accessorKey: "type",
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title='Type de batiment' />
        },
        cell: ({ row }) => <div>{row.getValue("type")}</div>,
    },
    {
        accessorKey: 'is_common',
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title='Commun' />
        },
        cell: ({ row }) => {
            const isCommon = row.getValue('is_common')
            return (
                <div>{isCommon ? 'Oui' : 'Non'}</div>
            )
        },
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
            const building = row.original

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
                        <Link href={`/dashboard/building/${building.name}`}>
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


