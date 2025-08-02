"use client";
import { FaGithub } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="text-center justify-center flex flex-col py-8 md:py-12 gap-2 border-t-1">
      <div>
        <p className="text-sm">
          The whole platform is open source. All code is available on{" "}
          <a
            href="https://github.com/micnusz/tarkov-db"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View the project's source code on GitHub"
            className="text-sm inline-flex items-center gap-1 text-chart-3 hover:underline"
          >
            GitHub <FaGithub aria-hidden="true" />
          </a>
          .
        </p>
      </div>
      <div>
        <p className="text-xs text-muted-foreground">
          Game content and materials are trademarks and copyrights of
          Battlestate Games and its licensors. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
