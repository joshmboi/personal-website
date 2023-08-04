import { MutableRefObject } from "react";

import "./contact-email.scss";

interface ContactEmailProps {
  copiedMailRef: MutableRefObject<HTMLDivElement | null>;
}

export default function ContactEmail({ copiedMailRef }: ContactEmailProps) {
  return (
    <div id="copy-email" ref={copiedMailRef}>
      Copied email
    </div>
  );
}
