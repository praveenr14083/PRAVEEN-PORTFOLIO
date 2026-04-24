// 🔥 Email Service - Handles email operations

export interface EmailRequest {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export interface EmailResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const emailService = {
  // 🔥 Send email
  sendEmail: async (emailData: EmailRequest): Promise<EmailResponse> => {
    const res = await fetch("/api/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    });

    const response = await res.json().catch(() => null);

    if (!res.ok) {
      const errorMessage = response?.message || `API error: ${res.status}`;
      throw new Error(errorMessage);
    }

    return response as EmailResponse;
  },
};
