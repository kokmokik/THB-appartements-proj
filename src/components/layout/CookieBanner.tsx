"use client";

import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border shadow-lg p-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted text-center sm:text-left">
          Diese Website verwendet Cookies, um Ihnen die bestmögliche Erfahrung zu bieten.
          Weitere Informationen finden Sie in unserer{" "}
          <a href="/datenschutz" className="text-primary underline">
            Datenschutzerklärung
          </a>.
        </p>
        <div className="flex gap-3 shrink-0">
          <Button onClick={decline} variant="ghost" size="sm">
            Ablehnen
          </Button>
          <Button onClick={accept} size="sm">
            Akzeptieren
          </Button>
        </div>
      </div>
    </div>
  );
}
