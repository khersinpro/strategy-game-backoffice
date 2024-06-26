/* eslint-disable react/no-unescaped-entities */
"use client"

import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, View } from "lucide-react"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { Unit } from "@/src/types/unit"
import { getMinutesAndSeconds } from "@/src/utils/time"

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
            return <div>{getMinutesAndSeconds(trainingTime)}</div>
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
            const unit = row.original

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
                        <Link href={`/dashboard/unit/${unit.name}`}>
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


