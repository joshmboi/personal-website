import { MutableRefObject, useRef } from "react";

import "./contact-content.scss";

const instaImage = require("../../assets/images/contact/insta.svg");
const linkedinImage = require("../../assets/images/contact/linkedin.svg");
const mailImage = require("../../assets/images/contact/mail.svg");

interface ContactContentProps {
  copiedMailRef: MutableRefObject<HTMLDivElement | null>;
}

export default function ContactContent({ copiedMailRef }: ContactContentProps) {
  const myEmail = "joshmboisvert@gmail.com";

  const copiedMailDiv = copiedMailRef.current;
  const submitted = useRef<Boolean>(false);
  const contactFormRef = useRef<HTMLFormElement | null>(null);
  const submissionRef = useRef<HTMLHeadingElement | null>(null);
  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const lastNameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const messageRef = useRef<HTMLTextAreaElement | null>(null);

  const mailClick = () => {
    if (copiedMailDiv) {
      navigator.clipboard.writeText(myEmail);
      copiedMailDiv.style.opacity = "1";
      setTimeout(() => {
        copiedMailDiv.style.opacity = "0";
      }, 1500);
    }
  };

  const handleSubmit = () => {
    submitted.current = true;
  };

  const resetFields = () => {
    if (
      firstNameRef.current &&
      lastNameRef.current &&
      emailRef.current &&
      messageRef.current
    ) {
      firstNameRef.current.value = "";
      lastNameRef.current.value = "";
      emailRef.current.value = "";
      messageRef.current.value = "";
    }
  };

  const iframeLoad = () => {
    if (submitted.current && contactFormRef.current && submissionRef.current) {
      contactFormRef.current.style.opacity = "0";
      submissionRef.current.style.opacity = "1";
      window.setTimeout(resetFields, 1000);
      window.setTimeout(() => {
        if (contactFormRef.current && submissionRef.current) {
          contactFormRef.current.style.opacity = "1";
          submissionRef.current.style.opacity = "0";
        }
      }, 2000);
    }
  };

  return (
    <section id="contact-content">
      <section id="contact-image" />
      <section id="contact-form-and-socials">
        <form
          id="contact-me"
          name="google-form"
          encType="text/plain"
          action="https://docs.google.com/forms/d/e/1FAIpQLSdXdQNs2bX0JmO3tYo05i2U7IHAubd4zXf21NSBn0BeqbVjBA/formResponse?"
          target="hidden-email-iframe"
          onSubmit={handleSubmit}
          ref={contactFormRef}
        >
          <section id="contact-name">
            <input
              type="text"
              id="first-name"
              className="contact-text"
              name="entry.1239939153"
              placeholder="First Name"
              ref={firstNameRef}
            />
            <input
              type="text"
              id="last-name"
              className="contact-text"
              name="entry.1321193449"
              placeholder="Last Name"
              ref={lastNameRef}
            />
          </section>
          <input
            type="text"
            id="email"
            className="contact-text"
            name="entry.1988677298"
            placeholder="Email"
            ref={emailRef}
          />
          <textarea
            id="message"
            className="contact-text"
            name="entry.609032324"
            placeholder="Message"
            ref={messageRef}
          />
          <button id="contact-submit" type="submit">
            Submit
          </button>
        </form>
        <h3 id="submission-success" ref={submissionRef}>
          Thanks for reaching out!
        </h3>
        <section id="socials">
          <a
            className="social-link"
            href="https://www.instagram.com/joshmboi/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              id="insta"
              className="contact-image"
              src={instaImage}
              alt="The Instagram icon"
            />
          </a>
          <a
            className="social-link"
            href="https://www.linkedin.com/in/joshmboisvert/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              id="linkedin"
              className="contact-image"
              src={linkedinImage}
              alt="The LinkedIn icon"
            />
          </a>
          <button
            type="button"
            className="copy-mail"
            onClick={() => mailClick()}
          >
            <img
              id="mail"
              className="contact-image"
              src={mailImage}
              alt="A letter icon"
            />
          </button>
        </section>
      </section>
      <iframe
        title="hidden-email-iframe"
        name="hidden-email-iframe"
        id="hidden-email-iframe"
        onLoad={() => iframeLoad()}
      />
    </section>
  );
}
