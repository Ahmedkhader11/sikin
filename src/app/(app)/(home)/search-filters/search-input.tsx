"use client";
import { ListFilterIcon, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CustomCategory } from "../types";
import { CategoriesSidebar } from "./categories-sidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  disabled?: boolean;
  categories: CustomCategory[];
}

export const SearchInput = ({ disabled, categories }: Props) => {
  const [isSidebarOpen, setisSidebarOpen] = useState(false);
  return (
    <div className="flex items-center gap-2 w-full">
      <CategoriesSidebar
        categories={categories}
        open={isSidebarOpen}
        onOpenChange={setisSidebarOpen}
      />
      <div className="relative w-full ">
        <SearchIcon className="absolute size-5 text-gray-500 top-1/2 left-3  transform -translate-y-1/2" />
        <Input
          type="text"
          placeholder="Search Products..."
          disabled={disabled}
          className="w-full pl-10  py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {/* TODO:Add categories view all button */}
      <Button
        variant="elevated"
        className="size-12 shrink-0 flex lg:hidden"
        onClick={() => setisSidebarOpen(true)}
      >
        <ListFilterIcon />
      </Button>
      {/* TODO: Add library button */}
    </div>
  );
};
