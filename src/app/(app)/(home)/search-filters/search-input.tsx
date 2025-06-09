import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
interface Props {
  disabled?: boolean;
}

export const SearchInput = ({ disabled }: Props) => {
  return (
    <div className="flex items-center gap-2 w-full">
      <div className="relative w-full ">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-500" />
        <Input
          type="text"
          placeholder="Search Products..."
          disabled={disabled}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {/* TODO:Add categories view all button */}
      {/* TODO: Add library button */}
    </div>
  );
};
