'use client'

import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'


export default function CustomPagination({ page = 1, limit = 20, total = 20 }: { page: number, limit: number, total: number }) {
    const pathName = usePathname()
    const params = useSearchParams()
    const pageLength = Math.ceil(total / limit)
    const prevPage = page > 1 ? page - 1 : 1
    const nextPage = pageLength > page + 1 ? page + 1 : pageLength

    const urlGenerator = (page?: number | null, limit?: number) => {
        const searchParams = new URLSearchParams(params.toString())
        page && searchParams.set('page', page.toString())
        limit && searchParams.set('limit', limit.toString())
        return `${pathName}?${searchParams.toString()}`
    }

    const generateLinksToDisplay = (): Array<string | number> => {
        if (pageLength <= 5) {
            return Array.from({ length: pageLength }, (_, i) => i + 1)
        }
        else if (pageLength > 5 && (page >= 1 && page <= 3)) {
            return [1, 2, 3, '...', pageLength]
        }
        else if (pageLength > 5 && (page === pageLength || page === pageLength - 1 || page === pageLength - 2)) {
            return [1, '...', pageLength - 2, pageLength - 1, pageLength]
        } else {
            return [1, '...', page, '...', pageLength]
        }
    }

    return (
        <Pagination className="pb-4">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href={urlGenerator(prevPage)} />
                </PaginationItem>
                {
                    generateLinksToDisplay().map((pageNumber, i) => {
                        if (typeof pageNumber === 'number') {
                            return (
                                <PaginationItem key={i}>
                                    <PaginationLink href={urlGenerator(pageNumber)} isActive={pageNumber === page}>
                                        {pageNumber}
                                    </PaginationLink>
                                </PaginationItem>
                            )
                        } else {
                            return (
                                <PaginationItem key={i}>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            )
                        }
                    })
                }
                <PaginationItem>
                    <PaginationNext href={urlGenerator(nextPage)} />
                </PaginationItem>
            </PaginationContent>

            {/* Set max results to display */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">{limit}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <Link href={urlGenerator(1, 10)} scroll={false}>
                        <DropdownMenuItem>
                            10
                        </DropdownMenuItem>
                    </Link>
                    <Link href={urlGenerator(1, 20)} scroll={false}>
                        <DropdownMenuItem>
                            20
                        </DropdownMenuItem>
                    </Link>
                    <Link href={urlGenerator(1, 30)} scroll={false}>
                        <DropdownMenuItem>
                            30
                        </DropdownMenuItem>
                    </Link>
                    <Link href={urlGenerator(1, 40)} scroll={false}>
                        <DropdownMenuItem>
                            40
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuContent>
            </DropdownMenu>
        </Pagination>
    )
}