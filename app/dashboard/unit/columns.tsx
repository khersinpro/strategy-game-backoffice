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
import { Unit } from "@/src/types/unit"

export const columns: ColumnDef<Unit>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return <DataTableColumnHeader className="pl-3" column={column} title="Nom de l'unité" />
        },
        cell: ({ row }) => <div className="pl-3">{row.getValue("name")}</div>,
    },
    {
        accessorKey: "attack",
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Attaque de l'unité" />
        },
    },
    {
        accessorKey: 'carrying_capacity',
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title='Capacité de transport' />
        },
    },
    {
        accessorKey: 'movement_speed',
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title='Vitesse de déplacement' />
        },
    },
    {
        accessorKey: 'population_cost',
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title='Coût en population' />
        },
    },
    {
        accessorKey: 'military_building',
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Bâtiment d'entraînement" />
        },
    },
    {
        accessorKey: 'training_time',
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Durée d'entraînement" />
        },
        cell: ({ row }) => {
            const trainingTime: number = row.getValue('training_time')
            const minutes = Math.floor(trainingTime / 60)
            const seconds = trainingTime % 60
            return <div>{`${minutes}m ${seconds}s`}</div>
        }
    },
    {
        accessorKey: 'unit_type',
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Type d'unité" />
        },
    },
    {
        accessorKey: 'civilization_name',
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Civilisation associée" />
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
                        <DropdownMenuItem>
                            <View className="h-4 w-4 mr-2" />
                            Apperçu
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <FilePenLine className="h-4 w-4 mr-2" />
                            Éditer
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Trash className="h-4 w-4 mr-2" />
                            Supprimer
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]


