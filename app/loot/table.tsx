import React, { useState, useCallback } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableColumn, Pagination } from '@heroui/react';
import { User, Tooltip } from '@heroui/react'; // Make sure to import these from your UI library
import { DateTime } from 'luxon';
import { Loot } from '@/types/loot';
import { DeleteIcon, EditIcon, EyeIcon } from '@/components/icons';

const columns = [
    {name: "NAME", uid: "name"},
    {name: "Belongs To", uid: "belongs_to"},
    {name: "Distributed To", uid: "distributed_to"},
    {name: "Remaining Time", uid: "avaiable_until"},
    {name: "ACTIONS", uid: "actions"},
];

// Define the component that accepts the external data
interface LootTableProps {
    defaultLoots: Loot[];
}

export default function LootTable({ defaultLoots }: LootTableProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const totalItems = defaultLoots.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const renderCell = useCallback((loot: Loot, columnKey: keyof Loot | "actions") => {
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
                // Parse the 'avaiable_until' time (UTC) and convert it to the local time zone
                const availableUntil = DateTime.fromISO(loot.avaiable_until, { zone: 'utc' }).setZone('local');
                const currentTime = DateTime.local(); // Get the current time in the local time zone

                // Calculate the difference between the current time and the availableUntil time
                const diff = availableUntil.diff(currentTime, ['days', 'hours', 'minutes', 'seconds']);

                // If the time has already passed, show 'Expired'
                if (diff.as('milliseconds') <= 0) {
                    return (
                        <div className="flex flex-col">
                            <p className="text-bold text-sm capitalize">Expired</p>
                        </div>
                    );
                }

                // Get the difference in days, hours, and minutes
                const days = diff.days;
                const hours = diff.hours;
                const minutes = diff.minutes;
                const seconds = Math.ceil(diff.seconds);

                // Format the remaining time as a string
                let timeLeft = '';
                if (days > 0) {
                    timeLeft += `${days} day${days > 1 ? 's' : ''} `;
                }
                if (hours > 0) {
                    timeLeft += `${hours} hour${hours > 1 ? 's' : ''} `;
                }
                if (minutes > 0) {
                    timeLeft += `${minutes} minute${minutes > 1 ? 's' : ''} `;
                }
                if (seconds > 0) {
                    timeLeft += `${seconds} second${seconds > 1 ? 's' : ''}`;
                }
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{timeLeft || 'Expired'} {/* Default to 'Expired' if no time left */}</p>
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
                        <Tooltip content="Edit user">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EditIcon />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete user">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <DeleteIcon />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue as string;
        }
    }, []);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const paginatedItems = defaultLoots.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="overflow-x-auto">
            <Table aria-label="Example table with custom cells" className="min-w-full">
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.uid}>
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={paginatedItems}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey as keyof Loot | "actions")}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Pagination
                page={currentPage}
                total={totalPages}
                onChange={handlePageChange}
                className="mt-4"
            />
        </div>
    );
}
