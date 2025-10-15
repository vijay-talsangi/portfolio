import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Projects",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "Short one-liner about the project",
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
      description: "Detailed project description",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Project Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text",
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "technologies",
      title: "Technologies Used",
      type: "array",
      of: [{ type: "reference", to: [{ type: "skill" }] }],
      description: "Select from your skills list",
    }),
    defineField({
      name: "techStack",
      title: "Tech Stack (Tags)",
      type: "array",
      of: [{ type: "string" }],
      description: "Quick tags like 'React', 'Node.js', 'OpenAI API'",
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "category",
      title: "Project Category",
      type: "string",
      options: {
        list: [
          { title: "Web Application", value: "web-app" },
          { title: "Mobile App", value: "mobile-app" },
          { title: "AI/ML Project", value: "ai-ml" },
          { title: "API/Backend", value: "api-backend" },
          { title: "DevOps/Infrastructure", value: "devops" },
          { title: "Open Source", value: "open-source" },
          { title: "CLI Tool", value: "cli-tool" },
          { title: "Desktop App", value: "desktop-app" },
          { title: "Browser Extension", value: "browser-extension" },
          { title: "Game", value: "game" },
          { title: "Other", value: "other" },
        ],
      },
    }),
    defineField({
      name: "liveUrl",
      title: "Live URL",
      type: "url",
      description: "Link to the live project",
    }),
    defineField({
      name: "githubUrl",
      title: "GitHub URL",
      type: "url",
      description: "Link to the GitHub repository",
    }),
    defineField({
      name: "demoVideo",
      title: "Demo Video URL",
      type: "url",
      description: "YouTube, Vimeo, or Loom link",
    }),
    defineField({
      name: "featured",
      title: "Featured Project",
      type: "boolean",
      description: "Show this project prominently on the homepage",
      initialValue: false,
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "date",
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "date",
      description: "Leave blank if ongoing",
    }),
    defineField({
      name: "role",
      title: "Your Role",
      type: "string",
      description: "E.g., 'Lead Developer', 'Solo Project', 'Team Member'",
    }),
    defineField({
      name: "teamSize",
      title: "Team Size",
      type: "number",
      description: "Number of people who worked on this",
    }),
    defineField({
      name: "achievements",
      title: "Key Achievements",
      type: "array",
      of: [{ type: "string" }],
      description: "Bullet points of notable accomplishments",
    }),
    defineField({
      name: "metrics",
      title: "Impact Metrics",
      type: "object",
      fields: [
        { name: "users", title: "Users/Downloads", type: "string" },
        {
          name: "performance",
          title: "Performance Improvement",
          type: "string",
        },
        { name: "revenue", title: "Revenue Impact", type: "string" },
        { name: "other", title: "Other Metrics", type: "text" },
      ],
    }),
    defineField({
      name: "challenges",
      title: "Technical Challenges",
      type: "text",
      rows: 4,
      description: "What challenges did you overcome?",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "coverImage",
      category: "category",
      featured: "featured",
    },
    prepare(selection) {
      const { title, media, category, featured } = selection;
      return {
        title: featured ? `⭐ ${title}` : title,
        subtitle: category,
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
      title: "Newest First",
      name: "dateDesc",
      by: [{ field: "startDate", direction: "desc" }],
    },
  ],
});
