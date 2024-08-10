import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props<T> = {
  list: T[] | undefined;
  placeholder?: string;
  getItemValue: (item: T) => string;
  renderItem?: (item: T) => React.ReactNode;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

export const CustomSelect = <T,>({
  list,
  placeholder,
  getItemValue,
  renderItem,
  defaultValue,
  onValueChange,
}: Props<T>) => {
  return (
    <Select onValueChange={onValueChange} defaultValue={defaultValue}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="0">Not Specified</SelectItem>
        <SelectGroup>
          {list?.map((item, index) => (
            <SelectItem value={getItemValue(item)} key={index}>
              {renderItem ? renderItem(item) : String(item)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
