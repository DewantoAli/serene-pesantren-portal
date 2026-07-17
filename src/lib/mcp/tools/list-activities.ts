import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "list_activities",
  title: "List santri activities",
  description:
    "List activities (kegiatan santri) for the pesantren. By default returns only published activities. Editors/admins can also see drafts by setting include_drafts=true.",
  inputSchema: {
    include_drafts: z
      .boolean()
      .optional()
      .describe("Include unpublished drafts. Only effective for editors/admins."),
    limit: z.number().int().min(1).max(100).optional().describe("Maximum rows (default 20)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ include_drafts, limit }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    let query = supabase
      .from("activities")
      .select("id,title,description,date,time,location,participants,media_url,media_type,is_published,created_at,updated_at")
      .order("date", { ascending: false })
      .limit(limit ?? 20);
    if (!include_drafts) query = query.eq("is_published", true);

    const { data, error } = await query;
    if (error) {
      return { content: [{ type: "text", text: error.message }], isError: true };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
      structuredContent: { activities: data ?? [] },
    };
  },
});
