"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useMemo, useState } from "react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

import { ConfirmDialog } from "@/components/common/ConfirmDialog"
import { Button } from "@/components/ui/button"
import {
  ChevronLeft,
  ChevronRight,
  Columns,
  Edit,
  ExternalLink,
  FolderKanban,
  MoreHorizontal,
  RotateCcw,
  Search,
  Trash2,
} from "lucide-react"
import { EditProjectModal } from "../../projects/components/EditProjectModal"
import { useDeleteProject } from "../../projects/hooks/useProjects"

type Project = {
  _id: string
  title: string
  category: string
  status?: string
  featured?: boolean
  technologies: string[]
  description?: string
  liveUrl?: string
  githubUrl?: string
  image?: { url: string; public_id: string }
}

type Props = {
  data: Project[]
}

export function ProjectTable({ data }: Props) {
  const [search, setSearch] = useState("")
  const [columnVisibility, setColumnVisibility] = useState({})

  // State for Edit
  const [editOpen, setEditOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<any>(null)

  // State for Delete
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)

  const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject()

  // ✅ Columns with S.No, Image+Title combined, and Actions in dropdown
  const columns: ColumnDef<Project>[] = useMemo(
    () => [
      {
        id: "sno",
        header: "S.No",
        cell: ({ row }) => row.index + 1,
      },
      {
        id: "projectName",
        header: "Project Name",
        cell: ({ row }) => {
          const project = row.original
          return (
            <div className="flex items-center gap-3">
              {project.image?.url ? (
                <img
                  src={project.image.url}
                  alt={project.title}
                  className="h-10 w-10 rounded-md object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-muted/50">
                  <FolderKanban className="h-5 w-5 text-muted-foreground opacity-50" />
                </div>
              )}
              <span className="font-medium">{project.title}</span>
            </div>
          )
        },
      },
      {
        accessorKey: "category",
        header: "Category",
      },

      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.status
          return (
            <span
              className={`text-xs font-medium capitalize ${
                !status
                  ? "text-gray-500"
                  : status === "published"
                    ? "text-green-600"
                    : "text-yellow-600"
              }`}
            >
              {status || "No status"}
            </span>
          )
        },
      },
      {
        accessorKey: "featured",
        header: "Featured",
        cell: ({ row }) => (row.original.featured ? "Yes" : "No"),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const project = row.original
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 transition-colors hover:bg-muted"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                {project.liveUrl && (
                  <DropdownMenuItem
                    onClick={() => window.open(project.liveUrl, "_blank")}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedProject({
                      ...project,
                      technologies: project.technologies?.join(", ") || "",
                    })
                    setEditOpen(true)
                  }}
                >
                  <Edit className="mr-2 h-4 w-4 text-blue-500" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setDeleteId(project._id)
                    setDeleteConfirmOpen(true)
                  }}
                  className="text-red-600 focus:text-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
    ],
    []
  )

  // ✅ Global search through ALL fields
  const filteredData = useMemo(() => {
    if (search === "") return data

    const searchLower = search.toLowerCase()

    return data.filter((item) => {
      // Search through all string fields
      const matchesTitle = item.title.toLowerCase().includes(searchLower)
      const matchesCategory = item.category.toLowerCase().includes(searchLower)
      const matchesStatus =
        item.status?.toLowerCase().includes(searchLower) || false
      const matchesFeatured =
        item.featured?.toString().toLowerCase().includes(searchLower) || false
      const matchesTechnologies = item.technologies.some((tech) =>
        tech.toLowerCase().includes(searchLower)
      )
      const matchesDescription =
        item.description?.toLowerCase().includes(searchLower) || false

      // Return true if any field matches
      return (
        matchesTitle ||
        matchesCategory ||
        matchesStatus ||
        matchesFeatured ||
        matchesTechnologies ||
        matchesDescription
      )
    })
  }, [data, search])

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnVisibility,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  })

  // Reload function
  const handleReload = () => {
    setSearch("")
    setColumnVisibility({})
  }

  return (
    <div className="space-y-4">
      {/* 🔍 Global Search and Controls */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Global search: title, category, status, featured, technologies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9"
          />
        </div>

        {/* Column Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Columns className="h-4 w-4" />
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id === "sno"
                      ? "S.No"
                      : column.id === "titleWithImage"
                        ? "Title & Image"
                        : column.id === "actions"
                          ? "Actions"
                          : column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Reload Button */}
        <Button variant="outline" onClick={handleReload}>
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      {/* Search Results Count */}
      {search && (
        <div className="text-sm text-muted-foreground">
          Found {filteredData.length} result
          {filteredData.length !== 1 ? "s" : ""} for "{search}"
        </div>
      )}

      {/* 📊 Table */}
      <div className="border">
        <Table>
          <TableHeader className="bg-primary">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead className="text-white" key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
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
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="py-6 text-center"
                >
                  {search
                    ? `No results found for "${search}"`
                    : "No data available"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length === 0
            ? 0
            : table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
              1}
          -
          {Math.min(
            (table.getState().pagination.pageIndex + 1) *
              table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}{" "}
          of {table.getFilteredRowModel().rows.length}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>

      {/* Edit Modal */}
      <EditProjectModal
        open={editOpen}
        onOpenChange={setEditOpen}
        project={selectedProject}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        title="Delete Project"
        description="Are you sure you want to delete this project? This action cannot be undone."
        onConfirm={() => {
          if (deleteId) {
            deleteProject(deleteId)
            setDeleteConfirmOpen(false)
          }
        }}
        isLoading={isDeleting}
      />
    </div>
  )
}
