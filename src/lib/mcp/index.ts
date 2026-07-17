import { auth, defineMcp } from "@lovable.dev/mcp-js";
import whoami from "./tools/whoami";
import listActivities from "./tools/list-activities";
import createActivity from "./tools/create-activity";
import updateActivity from "./tools/update-activity";
import deleteActivity from "./tools/delete-activity";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "irsyadulhaq-mcp",
  title: "Irsyadul Haq Manado",
  version: "0.1.0",
  instructions:
    "Tools for the Pondok Pesantren Irsyadul Haq Manado website. Use `whoami` to verify sign-in, `list_activities` to read kegiatan santri, and `create_activity`/`update_activity`/`delete_activity` to manage them (editor/admin only, enforced by database policies).",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [whoami, listActivities, createActivity, updateActivity, deleteActivity],
});
