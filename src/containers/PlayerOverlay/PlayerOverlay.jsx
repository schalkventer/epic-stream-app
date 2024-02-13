import episodes from "../../data/episodes";
import schema from "./PlayerOverlay.schema";
import { Wrapper } from "./PlayerOverlay.Wrapper";

export const Component = (props) => {
  const { children } = props;
  const { id, status, toggle } = episodes.hooks.usePlayer();

  return (
    <>
      {children}

      {id && (
        <Wrapper
          id={id}
          isOpen={status === "playing"}
          toggleOpen={() => toggle(id)}
        />
      )}
    </>
  );
};

Component.propTypes = schema.props;
