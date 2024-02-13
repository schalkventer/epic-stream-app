import { test, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { Component } from "../../environments/Testing";
import hooks from "./favourites.hooks";

test("useList + useToggle + useClear", async () => {
  const log = [];

  const { result } = renderHook(() => hooks.useList(), {
    wrapper: Component,
  });

  await vi.waitUntil(() => Boolean(result.current), {
    timeout: 5000,
  });

  log.push(
    typeof result.current === "object" &&
      Object.keys(result.current).length < 1,
  );

  const { result: toggle } = renderHook(() => hooks.useToggle(), {
    wrapper: Component,
  });

  act(() => {
    toggle.current("7d553050-35e0-4ea8-8a81-aa842edf8b7c");
  });

  log.push(Object.keys(result.current).length === 1);

  const { result: clear } = renderHook(() => hooks.useClear(), {
    wrapper: Component,
  });

  act(() => clear.current());

  log.push(
    typeof result.current === "object" &&
      Object.keys(result.current).length < 1,
  );

  expect(log.every(Boolean)).toBe(true);
});

test("useSingle + useToggle", async () => {
  const log = [];

  const { result } = renderHook(
    () => hooks.useSingle("55ef4ea2-a739-4e6e-999e-3a69962b2e37"),
    {
      wrapper: Component,
    },
  );

  await vi.waitUntil(() => result.current.result === false, {
    timeout: 5000,
  });

  log.push(result.current.result);

  const { result: toggle } = renderHook(() => hooks.useToggle(), {
    wrapper: Component,
  });

  act(() => {
    toggle.current("55ef4ea2-a739-4e6e-999e-3a69962b2e37");
  });

  await vi.waitUntil(() => Boolean(result.current.result), {
    timeout: 5000,
  });

  log.push(result.current.result);

  act(() => {
    toggle.current("55ef4ea2-a739-4e6e-999e-3a69962b2e37");
  });

  await vi.waitUntil(() => result.current.result === false, {
    timeout: 5000,
  });

  log.push(result.current.result);

  const condition =
    log[0] === false && log[1] instanceof Date && log[2] === false;

  expect(condition).toBe(true);
});
