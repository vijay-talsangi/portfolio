import { defineField, defineType } from "sanity";

export default defineType({
  name: "skill",
  title: "Skills",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Skill Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Frontend", value: "frontend" },
          { title: "Backend", value: "backend" },
          { title: "AI/ML", value: "ai-ml" },
          { title: "DevOps", value: "devops" },
          { title: "Database", value: "database" },
          { title: "Mobile", value: "mobile" },
          { title: "Cloud", value: "cloud" },
          { title: "Testing", value: "testing" },
          { title: "Design", value: "design" },
          { title: "Tools", value: "tools" },
          { title: "Soft Skills", value: "soft-skills" },
          { title: "Other", value: "other" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "proficiency",
      title: "Proficiency Level",
      type: "string",
      options: {
        list: [
          { title: "Beginner", value: "beginner" },
          { title: "Intermediate", value: "intermediate" },
          { title: "Advanced", value: "advanced" },
          { title: "Expert", value: "expert" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "percentage",
      title: "Proficiency Percentage",
      type: "number",
      description: "0-100 for visual progress bars",
      validation: (Rule) => Rule.min(0).max(100),
    }),
    defineField({
      name: "yearsOfExperience",
      title: "Years of Experience",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "icon",
      title: "Icon/Logo",
      type: "image",
      description: "Upload skill icon or logo",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "color",
      title: "Brand Color",
      type: "string",
      description:
        "Hex color code for the skill badge (e.g., #61DAFB for React)",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Brief description of your experience with this skill",
    }),
    defineField({
      name: "featured",
      title: "Featured Skill",
      type: "boolean",
      description: "Highlight this skill prominently",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category",
      media: "icon",
      proficiency: "proficiency",
    },
    prepare(selection) {
      const { title, subtitle, media, proficiency } = selection;
      return {
        title: title,
        subtitle: `${subtitle} - ${proficiency}`,
        media: media,
      };
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Category, then Name",
      name: "categoryName",
      by: [
        { field: "category", direction: "asc" },
        { field: "name", direction: "asc" },
      ],
    },
  ],
});
