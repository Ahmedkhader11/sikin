import { Category } from "@/payload-types";
import { CategoryDropDown } from "./category-dropdown";

interface CategoryProps {
  data: any;
}

export const Categories = ({ data }: CategoryProps) => {
  return (
    <div className="flex flex-nowrap items-center">
      {data.map((category: Category) => (
        <div key={category.id}>
          <CategoryDropDown
            category={category}
            isActive={false}
            isNavigationHoevered={false}
          />
        </div>
      ))}
    </div>
  );
};
