import { Accordion, AccordionItem, Button, Chip, DatePicker, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
import MemberSearchBox from "../../components/member-search-box";
import { ZonedDateTime } from "@internationalized/date";
import { LockIcon } from "../../components/icons";
import { Loot, lootTypes, Request } from "@/types/loot";
import { Member } from "@/types/member";
import { useState, useEffect } from "react";
import { DateTime } from "luxon";

// Define the component that accepts the external data
interface LootRequestFormProps {
    defaultLoots: Loot[];
    defaultMembers: Member[];
    isOpen: any;
    onOpenChange: (open: boolean) => void;
    selectedLoot: Loot | null;
}

export default function LootRequestForm({
    defaultLoots,
    defaultMembers,
    isOpen,
    onOpenChange,
    selectedLoot
}: LootRequestFormProps) {
    const [lootId, setLootId] = useState(selectedLoot?.id);
    const [lootName, setLootName] = useState(selectedLoot?.name || "");
    const [acquirer, setAcquirer] = useState<string | undefined>(selectedLoot?.accquirer);
    const [requester, setRequester] = useState<string | undefined>("");
    const [requestHistory, setrequestHistory] = useState<Request[] | undefined>(selectedLoot?.requestHistory);
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
                            {selectedLoot ? "No loot selected" : "Request loot"}
                        </ModalHeader>
                        <ModalBody>
                            <MemberSearchBox
                                defaultItems={defaultLoots}
                                isReadOnly
                                label="Name"
                                placeholder="Enter loot name"
                                defaultSelectedKey={String(selectedLoot?.name)}
                            />
                            <MemberSearchBox
                                defaultItems={defaultMembers}
                                isReadOnly
                                label="Acquirer"
                                placeholder="Enter accquirer's name"
                                defaultSelectedKey={String(selectedLoot?.accquirer)}
                            />
                            <MemberSearchBox
                                defaultItems={defaultMembers}
                                isReadOnly
                                label="Belongs to"
                                placeholder="Who is this belongs to?"
                                defaultSelectedKey={String(selectedLoot?.belongsTo)}
                            />
                            <DatePicker
                                hideTimeZone
                                showMonthAndYearPickers
                                defaultValue={stringToZonedDateTime(selectedLoot?.avaiableUntil) || null}
                                label="Available Until"
                                variant="bordered"
                                onChange={(date) => setAvailableUntil(date)}
                            />
                            <MemberSearchBox
                                defaultItems={lootTypes.map((name, index) => ({ id: index + 1, name }))}
                                isReadOnly
                                label="Loot's type"
                                placeholder="Loot Type is"
                                defaultSelectedKey={String(selectedLoot?.type)}
                                value={lootType}
                            />
                            <MemberSearchBox
                                defaultItems={defaultMembers}
                                isReadOnly
                                label="Requesting person name"
                                placeholder="Who are you?"
                                onChange={(value) => setAcquirer(value.valueOf)}
                            />
                            {selectedLoot != null && selectedLoot.requestHistory.length > 0 && (
                            <Accordion variant="bordered">
                                <AccordionItem key="1" aria-label="People requesting for this" title="People requesting for this">
                                Main gear: 
                                {selectedLoot.requestHistory.filter(rq => rq.requestReason === 0).map((rq, index) =>
                                    <span key={index}>
                                        {index === 0 ? ` ${rq.requesterName}` : `, ${rq.requesterName}`}
                                    </span>
                                )}
                                <br />
                                Alternative gear: 
                                {selectedLoot.requestHistory.filter(rq => rq.requestReason === 1).map((rq, index) =>
                                    <span key={index}>
                                        {index === 0 ? ` ${rq.requesterName}` : `, ${rq.requesterName}`}
                                    </span>
                                )}
                                <br />
                                Trait:
                                {selectedLoot.requestHistory.filter(rq => rq.requestReason === 2).map((rq, index) =>
                                    <span key={index}>
                                        {index === 0 ? ` ${rq.requesterName}` : `, ${rq.requesterName}`}
                                    </span>
                                )}
                                <br />
                                Litho:
                                {selectedLoot.requestHistory.filter(rq => rq.requestReason === 3).map((rq, index) =>
                                    <span key={index}>
                                        {index === 0 ? ` ${rq.requesterName}` : `, ${rq.requesterName}`}
                                    </span>
                                )}
                                </AccordionItem>
                            </Accordion>
                            )}

                            <Input
                                endContent={
                                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                }
                                label="Your own Password"
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
