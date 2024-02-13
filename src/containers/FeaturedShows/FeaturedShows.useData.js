import { useEffect, useState } from "react";
import shows from "../../data/shows";

/**
 *
 */
export const useData = () => {
  const [status, setStatus] = useState("LOADING");
  const [step, setStep] = useState(0);

  const { result } = shows.hooks.useList({
    ...shows.helpers.BLANK_QUERY,
    limit: 6,
    sorting: "Random",
  });

  const nature = shows.hooks.useList({
    ...shows.helpers.BLANK_QUERY,
    limit: 6,
    genre: "Nature",
    sorting: "Random",
  });

  const action = shows.hooks.useList({
    ...shows.helpers.BLANK_QUERY,
    limit: 6,
    genre: "Action",
    sorting: "Random",
  });

  const comedy = shows.hooks.useList({
    ...shows.helpers.BLANK_QUERY,
    limit: 6,
    genre: "Comedy",
    sorting: "Random",
  });

  useEffect(() => {
    if (status !== "LOADING") return;
    if (result && nature && action && comedy) setStatus("IDLE");
  }, [result, nature, action, comedy, status]);

  const max = (result || []).length - 1;

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
    featured: result && result[step],
    nature: nature.result,
    action: action.result,
    comedy: comedy.result,
    move,
    status,
  };
};
