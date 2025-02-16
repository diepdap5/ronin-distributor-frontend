'use client'
import React, { useState } from "react";
import {
  Button,
  useDisclosure,
} from "@heroui/react";
import { PlusIcon} from "@/components/icons";
import { loots } from "@/types/loot";
import { members } from "@/types/member";
import LootForm from "@/app/loot/loot-form";
import LootTableFullset from "./table-fullset";

export default function MembersPage() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [isReadOnly, setIsReadOnly] = useState(true); // State for read-only mode
  const toggleReadOnly = () => {
    setIsReadOnly((prevReadOnly) => !prevReadOnly); // Toggle read-only mode
  };
  
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
        isReadOnly={isReadOnly} 
        selectedLoot={null}      />
      <LootTableFullset defaultLoots={loots} defaultMembers={members} />
    </div>
  );
  
}

