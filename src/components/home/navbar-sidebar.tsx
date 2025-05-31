import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

interface NavbarItem {
  href: string;
  children: React.ReactNode;
}

interface Props {
  items: NavbarItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NavbarSidebar = ({ items, open, onOpenChange }: Props) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="p-0 transition-none ">
        <SheetHeader className="p-4 border-b border-gray-400/50 ">
          <div className="flex items-center">
            <SheetTitle>Menu</SheetTitle>
          </div>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
              onClick={() => onOpenChange(!onOpenChange)}
            >
              {item.children}
            </Link>
          ))}
          <div className="border-t border-gray-400/50 grid grid-cols-2 gap-x-2 py-2 px-4">
            <Link
              href="/sign-in"
              className="w-full p-4 bg-white hover:bg-pink-400 flex items-center justify-center text-base font-medium ring ring-gray-400/50 rounded-lg tracking-widest"
              onClick={() => onOpenChange(!onOpenChange)}
            >
              Log in
            </Link>
            <Link
              href="/sign-up"
              className="w-full p-4 hover:text-white flex items-center  justify-center text-base font-medium bg-black text-white rounded-lg hover:bg-pink-400"
              onClick={() => onOpenChange(!onOpenChange)}
            >
              Start selling
            </Link>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
