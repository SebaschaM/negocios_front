import emailjs from "@emailjs/browser";

let serviceId = "service_4y1t2yb";
let templateId = "template_esdr12m";
let publicKey = "7Cc9xma0M4v40g1aN";

interface SendMail {
  fullname: string;
  email: string;
  phone: string;
  message: string;
}

export const sendEmailContact = async ({
  fullname,
  email,
  phone,
  message,
}: SendMail) => {
  await emailjs.send(
    serviceId,
    templateId,
    { fullname, email, phone, message },
    publicKey
  );
};
