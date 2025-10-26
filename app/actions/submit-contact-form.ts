"use server";

export type SubmitContactFormResult = { success: boolean; error?: string };

export async function submitContactForm(
  formData: FormData,
): Promise<SubmitContactFormResult> {
  try {
    // For now, we don't actually send anything. Just return success so the
    // client-side form can display a success message.
    if (formData)
      console.log(
        "Received form data:",
        Object.fromEntries(formData.entries()),
      );
    return { success: true };
  } catch (err) {
    // Defensive: return an error object if something unexpected happens.
    // Keep the error message minimal to avoid leaking sensitive details.
    console.error("submitContactForm error:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
