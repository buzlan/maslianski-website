export interface ContactFormParams {
  to_email: string;
  user_name: string;
  user_phone: string;
  user_email: string;
  message: string;
  personal_data: string;
  newsletter: string;
}

interface SendEmailOptions {
  serviceId: string;
  templateId: string;
  publicKey: string;
  params: ContactFormParams;
}

export async function sendEmail({
  serviceId,
  templateId,
  publicKey,
  params,
}: SendEmailOptions): Promise<void> {
  const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: params,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`EmailJS error: ${response.status} ${details}`);
  }
}
