"use server";

import { WORKFLOW_ID } from "@/lib/config";

/**
 * Create or refresh a ChatKit session for the client.
 *
 * Behaviour:
 * - If a Clerk-authenticated user exists, use their userId.
 * - If not, generate a short guest id so anyone can start a chat.
 * - Calls OpenAI ChatKit sessions endpoint and returns the session payload.
 */
export async function createSession() {
  // No authentication required — always create a guest id so anyone can start chat
  const effectiveUserId = `guest-${Math.random().toString(36).slice(2, 9)}`;

  const apiKey = process.env.OPENAI_API_KEY;
  // If OpenAI credentials or workflow id are not configured, return a
  // lightweight mock session so development and the chat UI continue to
  // function without errors. In production, ensure OPENAI_API_KEY and
  // WORKFLOW_ID are set.
  if (!apiKey || !WORKFLOW_ID) {
    return {
      session_id: `mock-session-${Date.now()}`,
      client_secret: `mock-secret-${Math.random().toString(36).slice(2, 8)}`,
      user: { id: effectiveUserId },
      expires_in: 3600,
      mock: true,
    } as const;
  }

  // Create ChatKit session with the (possibly guest) user id.
  const response = await fetch("https://api.openai.com/v1/chatkit/sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      workflow: WORKFLOW_ID,
      user: { id: effectiveUserId },
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    // Surface the error message coming from the API when available.
    throw new Error(data?.message || "Failed to create Chat session");
  }

  return data;
}
