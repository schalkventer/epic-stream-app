import { describe, test, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { Component } from "../../components/environments/Testing";
import hooks from "./shows.hooks";
import helpers from "./shows.helpers";

describe("data", () => {
  describe("shows", () => {
    describe("hooks", () => {
      test("useList", async () => {
        const { result } = renderHook(
          () => hooks.useList(helpers.BLANK_QUERY),
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
          () => hooks.useSingle("bfe26e23-13d0-4ed6-8701-3b1a160a6623"),
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
    });
  });
});
