import type { SchemaTypeDefinition } from "sanity";

import profile from "./profile";
import project from "./project";
import skill from "./skill";
import testimonial from "./testimonial";
import experience from "./experience";
import education from "./education";
import certification from "./certification";
import blog from "./blog";
import service from "./service";
import achievement from "./achievement";
import contact from "./contact";
import siteSettings from "./siteSettings";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    profile,
    project,
    skill,
    experience,
    education,
    testimonial,
    certification,
    achievement,
    blog,
    service,
    contact,
    siteSettings,
  ],
};
