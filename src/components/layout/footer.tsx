"use client";

import { LucideGithub } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="text-center justify-center flex py-8 md:py-12 gap-4">
      <a
        href="https://github.com/micnusz/tarkov-db"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Go to creator github profile"
      >
        <LucideGithub />
      </a>
      <h1>Work in progress</h1>
    </footer>
  );
};
