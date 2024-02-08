import { describe, test, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { Component } from "../../components/environments/Testing";
import hooks from "./episodes.hooks";

describe("data", () => {
  describe("episodes", () => {
    describe("hooks", () => {
      test("useSeason", async () => {
        const { result } = renderHook(
          () =>
            hooks.useSeason({
              season: 1,
              show: "bfe26e23-13d0-4ed6-8701-3b1a160a6623",
            }),
          {
            wrapper: Component,
          },
        );

        await vi.waitUntil(() => Boolean(result.current.result), {
          timeout: 5000,
        });

        const condition =
          Array.isArray(result.current.result) &&
          Object.keys(result.current.result).length > 0;

        expect(condition).toBe(true);
      });

      test("useSingle", async () => {
        const { result } = renderHook(
          () =>
            hooks.useSingle({
              episode: "55ef4ea2-a739-4e6e-999e-3a69962b2e37",
              show: "bfe26e23-13d0-4ed6-8701-3b1a160a6623",
            }),
          {
            wrapper: Component,
          },
        );

        await vi.waitUntil(() => Boolean(result.current.result), {
          timeout: 5000,
        });

        const condition = Object.keys(result.current.result).length > 0;
        expect(condition).toBe(true);
      });

      test("useList", async () => {
        const { result } = renderHook(
          () =>
            hooks.useList([
              {
                episodes: ["55ef4ea2-a739-4e6e-999e-3a69962b2e37"],
                show: "bfe26e23-13d0-4ed6-8701-3b1a160a6623",
              },
            ]),
          {
            wrapper: Component,
          },
        );

        await vi.waitUntil(() => Boolean(result.current.result), {
          timeout: 5000,
        });

        const condition =
          Array.isArray(result.current.result) &&
          Object.keys(result.current.result).length > 0;

        expect(condition).toBe(true);
      });
    });
  });
});
