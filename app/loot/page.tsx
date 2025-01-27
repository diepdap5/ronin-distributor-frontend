'use client'
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  RadioGroup, Radio,
  DatePicker,
  User,
} from "@heroui/react";
import { DateTime } from 'luxon';
import { DeleteIcon, EditIcon, EyeIcon, PlusIcon, LockIcon, MailIcon } from "@/components/icons";
import { Loot, loots } from "@/types/loot";
import {now, getLocalTimeZone} from "@internationalized/date";
import RealTimeSearch from "@/components/member-search-box";
import { members } from "@/types/member";
import MemberSearchBox from "@/components/member-search-box";
import LootForm from "@/app/loot/loot-form";
import LootTable from "./table";
import LootTableFullset from "./table-fullset";


export default function MembersPage() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  
  return (
    <div className="relative">
      <div className="flex gap-4 items-center" style={{ marginBottom: '20px' }}>
        <Button color="primary" endContent={<PlusIcon />} onPress={onOpen}>
          Add New
        </Button>  
      </div>
      <LootForm
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        defaultLoots={loots}
        defaultMembers={members}
      />
      <LootTableFullset />
    </div>
  );
  
}

