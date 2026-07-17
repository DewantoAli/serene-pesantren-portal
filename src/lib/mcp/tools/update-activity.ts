import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "update_activity",
  title: "Update santri activity",
  description:
    "Update fields of an existing kegiatan santri by id. Requires editor or admin role — enforced by database policies.",
  inputSchema: {
    id: z.string().uuid().describe("Activity UUID."),
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    date: z.string().optional().describe("YYYY-MM-DD"),
    time: z.string().optional(),
    location: z.string().optional(),
    participants: z.string().optional(),
    media_url: z.string().url().optional(),
    media_type: z.enum(["image", "video"]).optional(),
    is_published: z.boolean().optional(),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async ({ id, ...patch }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("activities")
      .update(patch)
      .eq("id", id)
      .select()
      .maybeSingle();
    if (error) {
      return { content: [{ type: "text", text: error.message }], isError: true };
    }
    if (!data) {
      return {
        content: [{ type: "text", text: "Activity not found or not permitted." }],
        isError: true,
      };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
      structuredContent: { activity: data },
    };
  },
});
