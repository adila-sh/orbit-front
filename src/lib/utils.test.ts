import { describe, expect, it } from "vitest";

import { cn } from "@/lib/utils";

describe("cn", () => {
  it("combina classes condicionais", () => {
    // Arrange
    const isActive = true;
    const isHidden = false;

    // Act
    const result = cn("base", isActive && "active", isHidden && "hidden");

    // Assert
    expect(result).toBe("base active");
  });

  it("resolve conflitos do tailwind mantendo a última classe", () => {
    // Act
    const result = cn("px-2 py-1", "px-4");

    // Assert
    expect(result).toBe("py-1 px-4");
  });
});
