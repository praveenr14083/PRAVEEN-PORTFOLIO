"use client";

import { useMutation } from "@tanstack/react-query";
import {
  emailService,
  EmailRequest,
  EmailResponse,
} from "@/services/email.service";

// 🔑 Mutation Keys
const MUTATION_KEYS = {
  SEND_EMAIL: ["send-email"],
};

// ✅ SEND EMAIL
export const useSendEmail = () => {
  return useMutation<EmailResponse, Error, EmailRequest>({
    mutationKey: MUTATION_KEYS.SEND_EMAIL,
    mutationFn: emailService.sendEmail,
  });
};
