import { Categories } from "./categories";
import { SearchInput } from "./search-input";

interface Props {
  data: any;
}

export const SearchFilters = ({ data }: Props) => {
  return (
    <div className="px-4 lg:px-12 py-2.5 lg:py-5 border-b flex flex-col gap-4 w-full">
      <SearchInput disabled={false} />
      <Categories data={data} />
    </div>
  );
};
