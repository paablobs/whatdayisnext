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
import { getRandomSarcasticPhrase } from "../../helpers/getRandomSarcasticPhrase";

vi.mock("../../helpers/getRandomSarcasticPhrase", () => ({
  getRandomSarcasticPhrase: vi.fn((mode: "next" | "today") => `${mode} phrase`),
}));

const phraseMock = vi.mocked(getRandomSarcasticPhrase);

const renderMainView = () =>
  render(
    <ChakraProvider value={system}>
      <MainView />
    </ChakraProvider>,
  );

describe("MainView", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
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

  it("rotates loading phrases every two seconds and stops after completion", () => {
    renderMainView();

    fireEvent.click(screen.getByRole("button", { name: "Monday" }));
    fireEvent.click(screen.getByRole("button", { name: "Compute next day" }));

    expect(phraseMock).toHaveBeenCalledTimes(2);

    act(() => vi.advanceTimersByTime(1999));
    expect(phraseMock).toHaveBeenCalledTimes(2);

    act(() => vi.advanceTimersByTime(1));
    expect(phraseMock).toHaveBeenCalledTimes(3);

    act(() => vi.advanceTimersByTime(2000));
    expect(phraseMock).toHaveBeenCalledTimes(4);

    act(() => vi.advanceTimersByTime(2000));
    expect(phraseMock).toHaveBeenCalledTimes(4);
  });

  it("cleans up the delayed lookup and phrase interval on unmount", () => {
    const { unmount } = renderMainView();

    fireEvent.click(screen.getByRole("button", { name: "Monday" }));
    fireEvent.click(screen.getByRole("button", { name: "Compute next day" }));
    const callsBeforeUnmount = phraseMock.mock.calls.length;

    unmount();
    act(() => vi.advanceTimersByTime(5000));

    expect(phraseMock).toHaveBeenCalledTimes(callsBeforeUnmount);
    expect(vi.getTimerCount()).toBe(0);
  });
});
