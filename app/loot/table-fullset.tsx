import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  User,
  Pagination,
  Tooltip,
  SharedSelection,
} from "@heroui/react";
import { Loot, loots } from "@/types/loot";
import { ChevronDownIcon, DeleteIcon, EditIcon, EyeIcon, PlusIcon, SearchIcon, SubmitRequestIcon } from "@/components/icons";
import { DateTime } from "luxon";


const columns = [
    {name: "NAME", uid: "name", sortable: true},
    {name: "Belongs To", uid: "belongs_to", sortable: true},
    {name: "Distributed To", uid: "distributed_to", sortable: true},
    {name: "Remaining Time", uid: "avaiable_until", sortable: true},
    {name: "ACTIONS", uid: "actions"},
];

interface SortDescriptor {
    column: keyof Loot | "actions";
    direction: "ascending" | "descending";
}

export function capitalize(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

const INITIAL_VISIBLE_COLUMNS = ["name", "belongs_to", "avaiable_until", "actions"];

export default function LootTableFullset() {
    const [filterValue, setFilterValue] = React.useState("");
    const [visibleColumns, setVisibleColumns] = React.useState<Set<string>>(
        new Set(INITIAL_VISIBLE_COLUMNS)
    );    
    const [statusFilter] = React.useState("all");
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "name",
        direction: "ascending",
    });

    // Handle selection changes with SharedSelection (properly typing the keys)
    const handleSelectionChange = (selection: SharedSelection) => {
        if (selection === "all") {
          setVisibleColumns(new Set(columns.map(column => column.uid)));
        } else {
          const selectedKeys = selection as Set<string>;
          setVisibleColumns(new Set(selectedKeys));
        }
    };

    const [page, setPage] = React.useState(1);

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
      return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredLoots = [...loots];

        if (hasSearchFilter) {
            // filteredLoots = filteredLoots.filter((loot) =>
            //     loot.name.toLowerCase().includes(filterValue.toLowerCase()),
            // );
            filteredLoots = filteredLoots.filter((loot) =>
              Object.values(loot)
                .join(' ') // Combine all the values into a single string (to allow searching across all columns)
                .toLowerCase()
                .includes(filterValue.toLowerCase()) // Check if the filter value exists in any part of the row
            );
        }

        return filteredLoots;
    }, [filterValue, statusFilter]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a, b) => {
            const columnKey = sortDescriptor.column;
            let first, second;
        
            if (columnKey === "actions") {
                return 0;
            }
        
            first = a[columnKey];
            second = b[columnKey];
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const renderCell = React.useCallback((loot: Loot, columnKey: keyof Loot | "actions") => {
        const cellValue = loot[columnKey as keyof Loot];

        switch (columnKey) {
        case "name":
            return (
                <User
                    avatarProps={{ radius: "lg", src: loot.avatar }}
                    description={loot.type}
                    name={cellValue as string}
                >
                    {loot.type}
                </User>
            );
        case "belongs_to":
            return (
                <div className="flex flex-col">
                    <p className="text-bold text-sm capitalize">{cellValue as string}</p>
                </div>
            );
        case "distributed_to":
            return (
                <div className="flex flex-col">
                    <p className="text-bold text-sm capitalize">{cellValue as string}</p>
                </div>
            );
        case "avaiable_until":
            const availableUntil = DateTime.fromISO(loot.avaiable_until, { zone: 'utc' }).setZone('local');
            const currentTime = DateTime.local();
            const diff = availableUntil.diff(currentTime, ['days', 'hours', 'minutes', 'seconds']);

            if (diff.as('milliseconds') <= 0) {
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">Expired</p>
                    </div>
                );
            }

            const days = diff.days;
            const hours = diff.hours;
            const minutes = diff.minutes;
            const seconds = Math.ceil(diff.seconds);

            let timeLeft = '';
            if (days > 0) timeLeft += `${days} day${days > 1 ? 's' : ''} `;
            if (hours > 0) timeLeft += `${hours} hour${hours > 1 ? 's' : ''} `;
            if (minutes > 0) timeLeft += `${minutes} minute${minutes > 1 ? 's' : ''} `;
            if (seconds > 0) timeLeft += `${seconds} second${seconds > 1 ? 's' : ''}`;

            return (
                <div className="flex flex-col">
                    <p className="text-bold text-sm capitalize">{timeLeft || 'Expired'}</p>
                </div>
            );
        case "actions":
            return (
                <div className="relative flex items-center gap-2">
                    <Tooltip content="Details">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <EyeIcon />
                        </span>
                    </Tooltip>
                    <Tooltip color="success" content="Request">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <SubmitRequestIcon />
                        </span>
                    </Tooltip>
                    <Tooltip color="warning" content="Edit">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <EditIcon />
                        </span>
                    </Tooltip>
                    <Tooltip color="danger" content="Delete">
                        <span className="text-lg text-danger cursor-pointer active:opacity-50">
                            <DeleteIcon />
                        </span>
                    </Tooltip>
                </div>
            );
        default:
            return cellValue;
        }
    }, []);

    const onNextPage = React.useCallback(() => {
        if (page < pages) setPage(page + 1);
    }, [page, pages]);

    const onPreviousPage = React.useCallback(() => {
        if (page > 1) setPage(page - 1);
    }, [page]);

    const onRowsPerPageChange = React.useCallback((e: { target: { value: any; }; }) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSearchChange = React.useCallback((value: React.SetStateAction<string>) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = React.useCallback(() => {
        setFilterValue("");
        setPage(1);
    }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={handleSelectionChange}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {loots.length} loots</span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    visibleColumns,
    loots.length,
    onRowsPerPageChange,
    onSearchChange,
    onClear
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            Previous
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            Next
          </Button>
        </div>
      </div>
    );
  }, [items.length, page, pages]);


  return (
    <Table
      isHeaderSticky
      aria-label="Example table with custom cells, pagination and sorting"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px]",
      }}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSortChange={(descriptor) => setSortDescriptor(descriptor as SortDescriptor)}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No loots found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey as keyof Loot | "actions")}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
