'use client'
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  RadioGroup, Radio
} from "@heroui/react";
import {members, Member, Status} from "../../types/member"
import {statusColorMap} from "../../types/index"
import { DeleteIcon, EditIcon, EyeIcon, PlusIcon, LockIcon, MailIcon } from "@/components/icons";

export const columns = [
  {name: "NAME", uid: "name"},
  {name: "ROLE", uid: "role"},
  {name: "STATUS", uid: "status"},
  {name: "ACTIONS", uid: "actions"},
];

export default function MembersPage() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const renderCell = React.useCallback((user: Member, columnKey: keyof Member | "actions") => {
    const cellValue = user[columnKey as keyof Member];
  
    switch (columnKey) {
      case "name":
        return (
          <div className="flex flex-col">
          <p className="text-bold text-sm capitalize">{cellValue as string}</p>
          <p className="text-bold text-sm capitalize text-default-400">{user.nickname}</p>
        </div>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue as string}</p>
            <p className="text-bold text-sm capitalize text-default-400">{user.team}</p>
          </div>
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[user.status as Status]} size="sm" variant="flat">
            {cellValue as string}
          </Chip>
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
  
  
  return (
    <div className="relative">
      <div className="flex gap-4 items-center" style={{ marginBottom: '20px' }}> <Button isIconOnly aria-label="Add" color="success" onPress={onOpen}> <PlusIcon size={24} height={24} width={24} fill="grey"/> </Button> </div>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add new member</ModalHeader>
              <ModalBody>
                <Input
                  label="Name"
                  placeholder="Enter your ingame name"
                  variant="bordered"
                />
                <Input
                  label="Nickname"
                  placeholder="Enter your how you want to be called"
                  variant="bordered"
                />
                <RadioGroup label="Team" orientation="horizontal">
                  <Radio value="buenos-aires">DPS</Radio>
                  <Radio value="sydney">Tank</Radio>
                  <Radio value="san-francisco">Healer</Radio>
                </RadioGroup>
                <Input
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Admin Password"
                  placeholder="Enter password for confirmation"
                  type="password"
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="overflow-x-auto">
        <Table aria-label="Example table with custom cells" className="min-w-full">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid} >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={members}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => <TableCell>{renderCell(item, columnKey as keyof Member | "actions")}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

