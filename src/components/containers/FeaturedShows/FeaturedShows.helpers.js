import { useEffect, useState } from "react";
import data from "../../../data";

/**
 *
 */
export const useData = () => {
  const { list } = data.hooks.useShowsList({ limit: 6, sorting: "Random" });
  const [status, setStatus] = useState("LOADING");
  const [step, setStep] = useState(0);

  const nature = data.hooks.useShowsList({
    limit: 6,
    genre: "Nature",
    sorting: "Random",
  });

  const action = data.hooks.useShowsList({
    limit: 6,
    genre: "Action",
    sorting: "Random",
  });

  const comedy = data.hooks.useShowsList({
    limit: 6,
    genre: "Comedy",
    sorting: "Random",
  });

  useEffect(() => {
    if (status !== "LOADING") return;
    if (list && nature && action && comedy) setStatus("IDLE");
  }, [list, nature, action, comedy, status]);

  const max = (list || []).length - 1;

  /**
   *
   */
  const move = (direction) => {
    if (direction === "left" && step < 1) return setStep(max);
    if (direction === "left") return setStep(max);
    if (direction === "right" && step >= max) return setStep(0);
    return setStep(step + 1);
  };

  return {
    featured: list && list[step],
    nature: nature.list,
    action: action.list,
    comedy: comedy.list,
    move,
    status,
  };
};
