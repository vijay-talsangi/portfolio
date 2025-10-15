import { defineField, defineType } from "sanity";

export default defineType({
  name: "contact",
  title: "Contact Form Submissions",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "subject",
      title: "Subject",
      type: "string",
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "company",
      title: "Company",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
    }),
    defineField({
      name: "budget",
      title: "Project Budget",
      type: "string",
    }),
    defineField({
      name: "timeline",
      title: "Project Timeline",
      type: "string",
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "In Progress", value: "in-progress" },
          { title: "Replied", value: "replied" },
          { title: "Closed", value: "closed" },
          { title: "Spam", value: "spam" },
        ],
      },
      initialValue: "new",
    }),
    defineField({
      name: "notes",
      title: "Internal Notes",
      type: "text",
      rows: 3,
      description: "Private notes about this inquiry",
    }),
    defineField({
      name: "priority",
      title: "Priority",
      type: "string",
      options: {
        list: [
          { title: "Low", value: "low" },
          { title: "Medium", value: "medium" },
          { title: "High", value: "high" },
          { title: "Urgent", value: "urgent" },
        ],
      },
      initialValue: "medium",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "email",
      status: "status",
    },
    prepare(selection) {
      const { title, subtitle, status } = selection;
      const statusEmoji = {
        new: "🆕",
        "in-progress": "⏳",
        replied: "✅",
        closed: "📁",
        spam: "🚫",
      };
      return {
        title: `${
          statusEmoji[status as keyof typeof statusEmoji] || ""
        } ${title}`,
        subtitle: subtitle,
      };
    },
  },
  orderings: [
    {
      title: "Newest First",
      name: "submittedDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
    {
      title: "Status",
      name: "status",
      by: [{ field: "status", direction: "asc" }],
    },
  ],
});
