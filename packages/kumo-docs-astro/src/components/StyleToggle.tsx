import { useState, useEffect } from "react";
import { Button, Tooltip } from "@cloudflare/kumo";
import { Globe, GlobeX } from "@phosphor-icons/react";

const STORAGE_KEY = "stratus-styles";
const STYLESHEET_ID = "stratus-styles-link";

export function StyleToggle() {
  const [enabled, setEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Read initial state from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "true") {
      setEnabled(true);
      injectStylesheet();
    }
  }, []);

  const injectStylesheet = () => {
    if (document.getElementById(STYLESHEET_ID)) return;

    const link = document.createElement("link");
    link.id = STYLESHEET_ID;
    link.rel = "stylesheet";
    link.href = "/stratus.css";
    document.head.appendChild(link);
  };

  const removeStylesheet = () => {
    const link = document.getElementById(STYLESHEET_ID);
    if (link) {
      link.remove();
    }
  };

  const toggleStyles = () => {
    const newEnabled = !enabled;
    setEnabled(newEnabled);
    localStorage.setItem(STORAGE_KEY, String(newEnabled));

    if (newEnabled) {
      injectStylesheet();
    } else {
      removeStylesheet();
    }
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        shape="square"
        aria-label="Toggle Stratus global styles"
      >
        <GlobeX size={20} />
      </Button>
    );
  }

  return (
    <Tooltip content="Toggle Stratus global styles">
      <Button
        variant="ghost"
        shape="square"
        aria-label={
          enabled
            ? "Disable Stratus global styles"
            : "Enable Stratus global styles"
        }
        aria-pressed={enabled}
        onClick={toggleStyles}
      >
        {enabled ? <Globe size={20} /> : <GlobeX size={20} />}
      </Button>
    </Tooltip>
  );
}
