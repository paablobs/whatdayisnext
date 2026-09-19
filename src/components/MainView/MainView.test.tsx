import { ChakraProvider } from "@chakra-ui/react";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { system } from "../../theme";
import MainView from "./MainView";

const renderMainView = () =>
  render(
    <ChakraProvider value={system}>
      <MainView />
    </ChakraProvider>,
  );

describe("MainView", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockImplementation(() => ({
        matches: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    );
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("blocks day changes while calculating and announces the result", () => {
    renderMainView();

    fireEvent.click(screen.getByRole("button", { name: "Monday" }));
    fireEvent.click(screen.getByRole("button", { name: "Compute next day" }));

    expect(screen.getByRole("button", { name: "Tuesday" })).toBeDisabled();
    expect(screen.getByRole("status")).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(4000));

    expect(screen.getByRole("status")).toHaveTextContent("Next day is Tuesday");
    expect(screen.getByRole("button", { name: "Tuesday" })).not.toBeDisabled();
  });

  it("selects the current day after the delayed lookup", () => {
    vi.setSystemTime(new Date(2026, 8, 20, 12));
    renderMainView();

    fireEvent.click(screen.getByRole("button", { name: "What day is today?" }));
    act(() => vi.advanceTimersByTime(4000));

    expect(screen.getByRole("button", { name: "Sunday" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(
      screen.getByRole("button", { name: "Compute next day" }),
    ).toBeEnabled();
  });
});
