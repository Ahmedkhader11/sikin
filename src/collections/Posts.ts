import type { CollectionConfig } from "payload";

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "content",
      type: "richText",
      required: true,
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "users",
      required: true,
    },
    {
      name: "published",
      type: "checkbox",
      label: "Published",
      defaultValue: false,
    },
    {
      name: "publishedDate",
      type: "date",
      admin: {
        condition: (_, siblingData) => Boolean(siblingData.published),
      },
    },
  ],
};
