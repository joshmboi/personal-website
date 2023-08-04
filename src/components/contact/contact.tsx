import { useRef } from "react";

import ContactContent from "../contact-content/contact-content";
import ContactEmail from "../contact-email/contact-email";

export default function Contact() {
  const copiedMailRef = useRef<HTMLDivElement | null>(null);

  return (
    <section id="page-wrap">
      <h1>Contact Me</h1>
      <ContactContent copiedMailRef={copiedMailRef} />
      <ContactEmail copiedMailRef={copiedMailRef} />
    </section>
  );
}
