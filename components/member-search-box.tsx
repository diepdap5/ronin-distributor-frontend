import { Member } from "@/types/member";
import { Autocomplete, AutocompleteItem } from "@heroui/react";  // Assuming this is the correct import for Hero UI's Autocomplete component

// Define the component that accepts the external data
interface MemberSearchBoxProps {
  defaultItems: any ;  // Expecting an array of objects with key and label
  defaultSelectedKey?: string;
  label: string;
  placeholder: string;
}

export default function MemberSearchBox({
  defaultItems,
  defaultSelectedKey,
  label,
  placeholder,
}: MemberSearchBoxProps) {
  return (
    <Autocomplete
      isRequired
      className="max-w-xs"
      defaultItems={defaultItems}
      defaultSelectedKey={defaultSelectedKey}
      label={label}
      placeholder={placeholder}
    >
      {(item: any) => (
        <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>
      )}
    </Autocomplete>
  );
}
