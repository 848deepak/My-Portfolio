"use client";
import React, { useState, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/stateful-button";
import { cn } from "@/lib/utils";
import emailjs from "emailjs-com";

export default function SignupFormDemo() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (!formRef.current) return;
    try {
      await emailjs.sendForm(
        "service_2qbqnbn", // Service ID
        "template_5qojkpq", // Template ID
        formRef.current,
        "n1POf-JzvMDSaUZq-" // Public Key
      );
      setSubmitted(true);
    } catch (err: any) {
      setError("Failed to send message. Please try again later. " + (err?.text || err?.message || ""));
      console.error("EmailJS error:", err);
    }
  };

  if (submitted) {
    return (
      <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-8 md:rounded-2xl md:p-12 dark:bg-black flex flex-col items-center justify-center min-h-[350px]">
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">Thank you!</h2>
        <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-2 text-center">Your message has been sent. I'll get back to you as soon as possible.</p>
      </div>
    );
  }
  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Send Me a Message
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        I'd love to hear from you! Let's discuss your project or just say hello.
      </p>
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      <form className="my-8" ref={formRef} onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input id="firstname" name="firstname" placeholder="John" type="text" required />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input id="lastname" name="lastname" placeholder="Doe" type="text" required />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" name="email" placeholder="john.doe@example.com" type="email" required />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" name="subject" placeholder="" type="text" required />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="message">Message</Label>
          <textarea
            id="message"
            name="message"
            placeholder=""
            className="shadow-input dark:placeholder-text-neutral-600 flex h-24 w-full rounded-md border-none bg-gray-50 px-3 py-2 text-sm text-black transition duration-400 group-hover/input:shadow-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:ring-[2px] focus-visible:ring-neutral-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-800 dark:text-white dark:shadow-[0px_0px_1px_1px_#404040] dark:focus-visible:ring-neutral-600 resize-none"
            required
          />
        </LabelInputContainer>
        <div className="flex justify-center">
          <Button
            type="submit"
            className="w-full"
          >
            Send Message
          </Button>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
}; 