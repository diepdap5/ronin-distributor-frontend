import { Autocomplete, AutocompleteItem } from "@heroui/react";

// Define the component's props interface
interface MemberSearchBoxProps {
  defaultItems: any;  // Expecting an array of Member objects
  label: string;
  placeholder: string;
  isReadOnly: boolean;
  value?: string;  // Controlled value (e.g., the name of the selected item)
  onChange?: (value: string) => void;  // Controlled onChange handler that expects a string
  defaultSelectedKey?: string | number;  // Add defaultSelectedKey to the interface
}

export default function MemberSearchBox({
  defaultItems,
  defaultSelectedKey,
  label,
  placeholder,
  isReadOnly,
  value,
  onChange
}: MemberSearchBoxProps) {
  // Filter valid items where each has id
  const validItems = defaultItems.filter((item: any) => item?.name);

  return (
    <Autocomplete
      isRequired
      className="max-w-xs"
      defaultItems={validItems} // Pass filtered items to Autocomplete
      defaultSelectedKey={defaultSelectedKey} // Default selected key (e.g., item.id)
      label={label}
      placeholder={placeholder}
      isReadOnly={isReadOnly}
      value={value} // Bind the controlled value
      onValueChange={onChange} // Handle controlled value change, now with string type
    >
      {/* Render each item as an AutocompleteItem */}
      {(item: any) => (
        <AutocompleteItem key={String(item.name)}>
          {item.name}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}
