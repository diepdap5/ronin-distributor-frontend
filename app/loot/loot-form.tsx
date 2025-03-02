import { Button, DatePicker, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
import MemberSearchBox from "../../components/member-search-box";
import { ZonedDateTime } from "@internationalized/date";
import { LockIcon } from "../../components/icons";
import { Loot, lootTypes } from "@/types/loot";
import { Member } from "@/types/member";
import { useState, useEffect } from "react";
import { DateTime } from "luxon";

// Define the component that accepts the external data
interface LootFormProps {
    defaultLoots: Loot[];
    defaultMembers: Member[];
    isOpen: any;
    onOpenChange: (open: boolean) => void;
    isReadOnly: boolean;
    selectedLoot: Loot | null;
}

export default function LootForm({
    defaultLoots,
    defaultMembers,
    isOpen,
    onOpenChange,
    isReadOnly,
    selectedLoot
}: LootFormProps) {
    const [lootId, setLootId] = useState(selectedLoot?.id);
    const [lootName, setLootName] = useState(selectedLoot?.name || "");
    const [acquirer, setAcquirer] = useState<string | undefined>(selectedLoot?.accquirer);
    const [belongsTo, setBelongsTo] = useState<string | undefined>(selectedLoot?.belongsTo);
    const [distributedTo, setDistributedTo] = useState<string | undefined>(selectedLoot?.distributedTo);
    const [availableUntil, setAvailableUntil] = useState<ZonedDateTime | null>(stringToZonedDateTime(selectedLoot?.avaiableUntil));
    const [lootType, setLootType] = useState(selectedLoot?.type || "");
    const [password, setPassword] = useState("");

    // Update form fields when selectedLoot changes (for editing)
    useEffect(() => {
            if (selectedLoot) {
                setLootId(selectedLoot.id)
                setLootName(selectedLoot.name);
                setAcquirer(selectedLoot.accquirer);
                setBelongsTo(selectedLoot.belongsTo);
                setDistributedTo(selectedLoot.distributedTo);
                setLootType(selectedLoot.type);
                setAvailableUntil(stringToZonedDateTime(selectedLoot.avaiableUntil));
            }
        }, [selectedLoot]);
  

    return (
        <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            {selectedLoot ? "Edit Loot" : "Add new loot"}
                        </ModalHeader>
                        <ModalBody>
                            <MemberSearchBox
                                defaultItems={defaultLoots}
                                isReadOnly={isReadOnly}
                                label="Name"
                                placeholder="Enter loot name"
                                defaultSelectedKey={String(selectedLoot?.name)}
                                onChange={(value) => setLootName(value.valueOf)}  // Corrected: expecting a string value
                            />
                            <MemberSearchBox
                                defaultItems={defaultMembers}
                                isReadOnly={isReadOnly}
                                label="Acquirer"
                                placeholder="Enter accquirer's name"
                                defaultSelectedKey={String(selectedLoot?.accquirer)}
                                onChange={(value) => setAcquirer(value.valueOf)}  // Corrected: expecting a string value
                            />
                            <MemberSearchBox
                                defaultItems={defaultMembers}
                                isReadOnly={isReadOnly}
                                label="Belongs to"
                                placeholder="Who is this belongs to?"
                                defaultSelectedKey={String(selectedLoot?.belongsTo)}
                                onChange={(value) => setBelongsTo(value)}  // Corrected: expecting a string value
                            />
                            <MemberSearchBox
                                defaultItems={defaultMembers}
                                isReadOnly={isReadOnly}
                                label="Distributed to"
                                placeholder="Who is this distributed to?"
                                defaultSelectedKey={String(selectedLoot?.distributedTo)}
                                value={distributedTo ?? undefined}  // Convert null to undefined
                                onChange={(value) => setDistributedTo(value)}  // Corrected: expecting a string value
                            />
                            <DatePicker
                                hideTimeZone
                                showMonthAndYearPickers
                                defaultValue={availableUntil || null}
                                label="Available Until"
                                variant="bordered"
                                onChange={(date) => setAvailableUntil(date)}
                            />
                            <MemberSearchBox
                                defaultItems={lootTypes.map((name, index) => ({ id: index + 1, name }))}
                                isReadOnly={isReadOnly}
                                label="Loot's type"
                                placeholder="Loot Type is"
                                defaultSelectedKey={String(selectedLoot?.type)}
                                value={lootType}
                                onChange={(value) => setLootType(value)}  // Corrected: expecting a string value
                            />
                            <Input
                                endContent={
                                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                }
                                label="Admin Password"
                                placeholder="Enter password for confirmation"
                                type="password"
                                variant="bordered"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}  // Keep this as it is for Input field
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={onClose}>
                                Close
                            </Button>
                            <Button color="primary" onPress={() => onClose()}>
                                {selectedLoot ? "Save Changes" : "Submit"}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

function stringToZonedDateTime(avaiableUntil: string  | undefined): ZonedDateTime | null {
    if (!avaiableUntil) {
        return null; // or handle the error appropriately
      }
    const parsedDate = DateTime.fromISO(avaiableUntil, { zone: 'utc' });
            
    if (parsedDate.isValid) {
        const { year, month, day, hour, minute, second, zoneName } = parsedDate;
        
        // Create ZonedDateTime with all required arguments
        const zonedDateTime = new ZonedDateTime(
        year, 
        month, 
        day, 
        zoneName,  // You need the time zone from parsedDate (Luxon provides it as zoneName)
        0,         // Default offset (adjust if needed)
        hour, 
        minute, 
        second
        );

        return zonedDateTime;
    }
    return null;
}

