import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "create_activity",
  title: "Create santri activity",
  description:
    "Create a new kegiatan santri (activity) entry. Requires editor or admin role — enforced by database policies.",
  inputSchema: {
    title: z.string().min(1).describe("Activity title."),
    description: z.string().optional().describe("Optional description / body text."),
    date: z.string().describe("Date in YYYY-MM-DD format."),
    time: z.string().optional().describe("Optional time, e.g. '08:00'."),
    location: z.string().optional(),
    participants: z.string().optional().describe("Participants description, e.g. 'Kelas VII'."),
    media_url: z.string().url().optional().describe("Optional image or video URL."),
    media_type: z.enum(["image", "video"]).optional(),
    is_published: z.boolean().optional().describe("Publish immediately (default false)."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async (input, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("activities")
      .insert({ ...input, created_by: ctx.getUserId() })
      .select()
      .maybeSingle();
    if (error) {
      return { content: [{ type: "text", text: error.message }], isError: true };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
      structuredContent: { activity: data },
    };
  },
});
