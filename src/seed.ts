import { getPayload } from "payload";
import config from "@payload-config";

const categories = [
  {
    name: "All",
    slug: "all",
  },
  {
    name: "Business & Money",
    color: "#FFB347",
    slug: "business-money",
    subcategories: [
      { name: "Accounting", slug: "accounting" },
      {
        name: "Entrepreneurship",
        slug: "entrepreneurship",
      },
      { name: "Gigs & Side Projects", slug: "gigs-side-projects" },
      { name: "Investing", slug: "investing" },
      { name: "Management & Leadership", slug: "management-leadership" },
      {
        name: "Marketing & Sales",
        slug: "marketing-sales",
      },
      { name: "Networking, Careers & Jobs", slug: "networking-careers-jobs" },
      { name: "Personal Finance", slug: "personal-finance" },
      { name: "Real Estate", slug: "real-estate" },
    ],
  },
  {
    name: "Software Development",
    color: "#7EC8E3",
    slug: "software-development",
    subcategories: [
      { name: "Web Development", slug: "web-development" },
      { name: "Mobile Development", slug: "mobile-development" },
      { name: "Game Development", slug: "game-development" },
      { name: "Programming Languages", slug: "programming-languages" },
      { name: "DevOps", slug: "devops" },
    ],
  },
  {
    name: "Writing & Publishing",
    color: "#D8B5FF",
    slug: "writing-publishing",
    subcategories: [
      { name: "Fiction", slug: "fiction" },
      { name: "Non-Fiction", slug: "non-fiction" },
      { name: "Blogging", slug: "blogging" },
      { name: "Copywriting", slug: "copywriting" },
      { name: "Self-Publishing", slug: "self-publishing" },
    ],
  },
  {
    name: "Other",
    slug: "other",
  },
  {
    name: "Education",
    color: "#FFE066",
    slug: "education",
    subcategories: [
      { name: "Online Courses", slug: "online-courses" },
      { name: "Tutoring", slug: "tutoring" },
      { name: "Test Preparation", slug: "test-preparation" },
      { name: "Language Learning", slug: "language-learning" },
    ],
  },
  {
    name: "Self Improvement",
    color: "#96E6B3",
    slug: "self-improvement",
    subcategories: [
      { name: "Productivity", slug: "productivity" },
      { name: "Personal Development", slug: "personal-development" },
      { name: "Mindfulness", slug: "mindfulness" },
      { name: "Career Growth", slug: "career-growth" },
    ],
  },
  {
    name: "Fitness & Health",
    color: "#FF9AA2",
    slug: "fitness-health",
    subcategories: [
      { name: "Workout Plans", slug: "workout-plans" },
      { name: "Nutrition", slug: "nutrition" },
      { name: "Mental Health", slug: "mental-health" },
      { name: "Yoga", slug: "yoga" },
    ],
  },
  {
    name: "Design",
    color: "#B5B9FF",
    slug: "design",
    subcategories: [
      { name: "UI/UX", slug: "ui-ux" },
      { name: "Graphic Design", slug: "graphic-design" },
      { name: "3D Modeling", slug: "3d-modeling" },
      { name: "Typography", slug: "typography" },
    ],
  },
  {
    name: "Drawing & Painting",
    color: "#FFCAB0",
    slug: "drawing-painting",
    subcategories: [
      { name: "Watercolor", slug: "watercolor" },
      { name: "Acrylic", slug: "acrylic" },
      { name: "Oil", slug: "oil" },
      { name: "Pastel", slug: "pastel" },
      { name: "Charcoal", slug: "charcoal" },
    ],
  },
  {
    name: "Music",
    color: "#FFD700",
    slug: "music",
    subcategories: [
      { name: "Songwriting", slug: "songwriting" },
      { name: "Music Production", slug: "music-production" },
      { name: "Music Theory", slug: "music-theory" },
      { name: "Music History", slug: "music-history" },
    ],
  },
  {
    name: "Photography",
    color: "#FF6B6B",
    slug: "photography",
    subcategories: [
      { name: "Portrait", slug: "portrait" },
      { name: "Landscape", slug: "landscape" },
      { name: "Street Photography", slug: "street-photography" },
      { name: "Nature", slug: "nature" },
      { name: "Macro", slug: "macro" },
    ],
  },
];

const seed = async () => {
  const payload = await getPayload({ config });

  // 1. Environment Guard Clause
  if (process.env.NODE_ENV === "production" && !process.env.ALLOW_SEEDING) {
    throw new Error(
      "Seeding blocked in production! Set ALLOW_SEEDING=1 to override"
    );
  }

  try {
    for (const category of categories) {
      // 2. Check for existing parent category
      const existingParent = await payload.find({
        collection: "categories",
        where: {
          slug: { equals: category.slug },
          parent: { equals: null },
        },
        limit: 1,
      });

      // 3. Skip if parent exists
      if (existingParent.totalDocs > 0) {
        console.log(`Skipping existing category: ${category.name}`);
        continue;
      }

      // 4. Create parent with error handling
      let parentCategory;
      try {
        parentCategory = await payload.create({
          collection: "categories",
          data: {
            name: category.name,
            slug: category.slug,
            color: category.color || "#CCCCCC", // Default color
            parent: null,
          },
        });
        console.log(`Created parent: ${category.name}`);
      } catch (err) {
        console.error(`Failed to create ${category.name}:`, err);
        continue; // Skip to next category
      }

      // 5. Process subcategories in parallel
      if (category.subcategories?.length) {
        const subPromises = category.subcategories.map(async (subCategory) => {
          // 6. Check for existing subcategory
          const existingSub = await payload.find({
            collection: "categories",
            where: {
              slug: { equals: subCategory.slug },
              parent: { equals: parentCategory.id },
            },
            limit: 1,
          });

          if (existingSub.totalDocs === 0) {
            await payload.create({
              collection: "categories",
              data: {
                name: subCategory.name,
                slug: subCategory.slug,
                parent: parentCategory.id,
              },
            });
            console.log(` ↳ Created subcategory: ${subCategory.name}`);
          }
        });

        // 7. Wait for all subcategories to process
        await Promise.allSettled(subPromises);
      }
    }
    console.log("✅ Seed completed successfully");
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
};

// 8. Execute with proper cleanup
seed()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
