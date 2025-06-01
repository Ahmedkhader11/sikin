import type { CollectionConfig } from "payload";

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
  },
  auth: false,
  fields: [
    {
      name: "title",
      type: "text",
      label: "Title",
      required: true,
    },
    {
      name: "content",
      type: "textarea",
      label: "Content",
      required: true,
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "users",
      label: "Author",
      required: true,
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      label: "Category",
    },
    {
      name: "published",
      type: "checkbox",
      label: "Published",
      defaultValue: false,
    },
    // Add more fields as needed
  ],
};
