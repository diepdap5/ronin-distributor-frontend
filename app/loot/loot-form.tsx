import {  Button, DatePicker, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Radio, RadioGroup } from "@heroui/react";  // Assuming this is the correct import for Hero UI's Autocomplete component
import MemberSearchBox from "../../components/member-search-box";
import {now, getLocalTimeZone} from "@internationalized/date";
import { LockIcon } from "../../components/icons";


// Define the component that accepts the external data
interface LootFormProps {
    defaultLoots: any ; 
    defaultMembers: any ; 
    isOpen: any;
    onOpenChange: any;
}

export default function LootForm({
    defaultLoots,
    defaultMembers,
    isOpen,
    onOpenChange
}: LootFormProps) {

return (
    <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
            {(onClose) => (
            <>
                <ModalHeader className="flex flex-col gap-1">Add new loot</ModalHeader>
                <ModalBody>
                <MemberSearchBox
                    defaultItems={defaultLoots}
                    label="Name"
                    placeholder="Enter loot name"
                />
                <MemberSearchBox
                    defaultItems={defaultMembers}
                    label="Accquirer"
                    placeholder="Enter accquirer's name"
                />
                <MemberSearchBox
                    defaultItems={defaultMembers}
                    label="Belongs to"
                    placeholder="Who is this belongs to?"
                />
                <MemberSearchBox
                    defaultItems={defaultMembers}
                    label="Distributed to"
                    placeholder="Who is this distributed to?"
                />
                <DatePicker
                    hideTimeZone
                    showMonthAndYearPickers
                    defaultValue={now(getLocalTimeZone())}
                    label="Avaiable Until"
                    variant="bordered"
                />
                <RadioGroup label="Loot Type" orientation="horizontal">
                    <Radio value="Weapon">Weapon</Radio>
                    <Radio value="Armor">Armor</Radio>
                    <Radio value="Legs">Legs</Radio>
                    <Radio value="Cloak">Cloak</Radio>
                    <Radio value="Belt">Belt</Radio>
                    <Radio value="Feet">Feet</Radio>
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
    );
}
