import React from "react";
import { describe, expect, test, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useEffect, useRef } from "react";

import { DemoAuthPage } from "@/components/demo/demo-auth-page";
import { DemoCreatePost } from "@/components/demo/demo-create-post";
import { DemoProvider, useDemo } from "@/components/demo/demo-provider";
import { currentUser, suggestedPrompts } from "@/lib/mock-data";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn()
  }),
  usePathname: () => "/"
}));

function Providers({ children }: { children: React.ReactNode }) {
  return <DemoProvider>{children}</DemoProvider>;
}

function LoginHarness() {
  return <DemoAuthPage mode="login" />;
}

function PostHarness() {
  const Probe = () => {
    const { login } = useDemo();
    const didLogin = useRef(false);

    useEffect(() => {
      if (!didLogin.current) {
        login("aylin@friendaway.app");
        didLogin.current = true;
      }
    }, [login]);
    return <DemoCreatePost user={currentUser} prompts={suggestedPrompts} />;
  };

  return (
    <DemoProvider>
      <Probe />
    </DemoProvider>
  );
}

describe("demo auth ui", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test("shows quick login shortcuts", () => {
    render(<LoginHarness />, { wrapper: Providers });
    expect(screen.getByText("Aylin")).toBeInTheDocument();
    expect(screen.getByText("Mateus")).toBeInTheDocument();
  });

  test("quick login button renders and can be pressed", async () => {
    const user = userEvent.setup();
    render(<LoginHarness />, { wrapper: Providers });
    await user.click(screen.getByRole("button", { name: /Aylin/i }));
    expect(screen.getByText("Quick login")).toBeInTheDocument();
  });
});

describe("demo post ui", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test("creates a post and clears the input", async () => {
    const user = userEvent.setup();
    render(<PostHarness />);

    const input = screen.getByPlaceholderText("What do you want to ask or share with your city?");
    await user.type(input, "Testing post flow");
    await user.click(screen.getByRole("button", { name: "Post to city feed" }));

    expect(input).toHaveValue("");
  });
});
