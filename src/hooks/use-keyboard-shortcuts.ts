import { useEffect } from "react";

export function useKeyboardShortcuts({
  onCommand,
  onProjects,
}: {
  onCommand: () => void;
  onProjects: () => void;
}) {
  useEffect(() => {
    let sequence = "";
    let resetTimer: ReturnType<typeof setTimeout> | undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
        return;
      if (event.key.toLowerCase() === "c" && !event.metaKey && !event.ctrlKey) {
        event.preventDefault();
        onCommand();
        return;
      }
      if (event.key === "/") {
        event.preventDefault();
        onCommand();
        return;
      }
      sequence = `${sequence}${event.key.toLowerCase()}`.slice(-2);
      if (sequence === "gp") {
        event.preventDefault();
        onProjects();
        sequence = "";
      }
      if (resetTimer) clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        sequence = "";
      }, 700);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      if (resetTimer) clearTimeout(resetTimer);
    };
  }, [onCommand, onProjects]);
}
