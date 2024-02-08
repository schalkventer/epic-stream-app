import episodes from "../../../data/episodes";
import schema from "./PlayerOverlay.schema";
import { Inner } from "./PlayerOverlay.Inner";

export const Component = (props) => {
  const { children } = props;
  const { id, status, toggle } = episodes.hooks.usePlayer();

  return (
    <>
      {children}
      {id && (
        <Inner
          id={id}
          isOpen={status === "playing"}
          toggleOpen={() => toggle(id)}
        />
      )}
    </>
  );
};

Component.propTypes = schema.props;
