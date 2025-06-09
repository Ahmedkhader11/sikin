import configPromise from "@payload-config";
import { getPayload } from "payload";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/home/navbar";
import { SearchFilters } from "./search-filters";
import { Category } from "@/payload-types";
interface Props {
  children: React.ReactNode;
}

const HomeLayout = async ({ children }: Props) => {
  const payload = await getPayload({
    config: configPromise,
  });

  const data = await payload.find({
    collection: "categories",
    depth: 1, // populate subcategories, subcategories.[0] will be a type of "Category"
    pagination: false,
    where: {
      parent: {
        exists: false,
      },
    },
  });

  const formattedData = data.docs.map((doc) => ({
    ...doc,
    subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
      // Because of "depth: 1" we are confident that "doc" will be a type of "Category"
      ...(doc as Category),
      subcategories: undefined,
    })),
  }));

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SearchFilters data={formattedData} />
      <main className="flex-1 bg-[#f4f4f0]">{children}</main>
      <Footer />
    </div>
  );
};

export default HomeLayout;
