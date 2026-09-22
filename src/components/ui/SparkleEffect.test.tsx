import { act, cleanup, render } from "@testing-library/react";
import type { RefObject } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SparkleEffect } from "./SparkleEffect";

type TestMediaQuery = MediaQueryList & {
  notify: (matches: boolean) => void;
};

const createMediaQuery = (matches: boolean): TestMediaQuery => {
  let currentMatches = matches;
  let listener: ((event: MediaQueryListEvent) => void) | null = null;

  return {
    get matches() {
      return currentMatches;
    },
    media: "(prefers-reduced-motion: reduce)",
    onchange: null,
    addEventListener: vi.fn((_type: string, callback: EventListener) => {
      listener = callback as (event: MediaQueryListEvent) => void;
    }),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(() => true),
    notify(nextMatches) {
      currentMatches = nextMatches;
      listener?.({ matches: nextMatches } as MediaQueryListEvent);
    },
  };
};

const createOriginRef = (): RefObject<HTMLElement | null> => {
  const origin = document.createElement("button");
  vi.spyOn(origin, "getBoundingClientRect").mockReturnValue({
    left: 100,
    top: 200,
    width: 80,
    height: 40,
    right: 180,
    bottom: 240,
    x: 100,
    y: 200,
    toJSON: () => ({}),
  });
  return { current: origin };
};

const sparkleCount = (container: HTMLElement) =>
  container.querySelector('[aria-hidden="true"]')?.querySelectorAll("div")
    .length ?? 0;

describe("SparkleEffect", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("creates an initial burst and keeps the loading interval alive across triggers", () => {
    const mediaQuery = createMediaQuery(false);
    vi.stubGlobal("matchMedia", vi.fn(() => mediaQuery));
    const originRef = createOriginRef();
    const view = render(
      <SparkleEffect trigger={1} isLoading={false} originRef={originRef} />,
    );

    expect(sparkleCount(view.container)).toBe(25);

    view.rerender(
      <SparkleEffect trigger={1} isLoading originRef={originRef} />,
    );
    act(() => vi.advanceTimersByTime(300));
    expect(sparkleCount(view.container)).toBe(33);

    view.rerender(
      <SparkleEffect trigger={2} isLoading originRef={originRef} />,
    );
    act(() => vi.advanceTimersByTime(300));

    expect(sparkleCount(view.container)).toBe(33);
  });

  it("does not create or schedule sparkles when reduced motion is enabled", () => {
    const mediaQuery = createMediaQuery(true);
    vi.stubGlobal("matchMedia", vi.fn(() => mediaQuery));
    const view = render(
      <SparkleEffect
        trigger={1}
        isLoading
        originRef={createOriginRef()}
      />,
    );

    act(() => vi.advanceTimersByTime(5000));

    expect(sparkleCount(view.container)).toBe(0);
    expect(vi.getTimerCount()).toBe(0);
  });

  it("clears existing sparkles when the motion preference changes", () => {
    const mediaQuery = createMediaQuery(false);
    vi.stubGlobal("matchMedia", vi.fn(() => mediaQuery));
    const view = render(
      <SparkleEffect
        trigger={1}
        isLoading
        originRef={createOriginRef()}
      />,
    );

    expect(sparkleCount(view.container)).toBe(25);

    act(() => mediaQuery.notify(true));

    expect(sparkleCount(view.container)).toBe(0);
    expect(vi.getTimerCount()).toBe(0);
  });

  it("does not replay the last burst when reduced motion is turned off", () => {
    const mediaQuery = createMediaQuery(false);
    vi.stubGlobal("matchMedia", vi.fn(() => mediaQuery));
    const view = render(
      <SparkleEffect
        trigger={1}
        isLoading
        originRef={createOriginRef()}
      />,
    );

    expect(sparkleCount(view.container)).toBe(25);

    act(() => mediaQuery.notify(true));
    act(() => mediaQuery.notify(false));

    expect(sparkleCount(view.container)).toBe(0);

    act(() => vi.advanceTimersByTime(300));
    expect(sparkleCount(view.container)).toBe(8);
  });
});
