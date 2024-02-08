import schema from "./favourites.schema";
import validate from "../../utils/validate";

/**
 * Takes the response created with JSON.parse and maps over it to turn the
 * date-time strings into actual JavaScript date objects before passing to the
 * Zustand store.
 *
 * @param {object} response
 */
const responseToList = (response) => {
  const entries = Object.entries(response).map(([id, added]) => ({
    [id]: new Date(added),
  }));

  return validate(Object.fromEntries(entries), schema.list);
};

/**
 * Retrieves a single favourite value from the key-value pair, based on the ID
 * passed. If the list of favourites are not available yet `null` is returned.
 * If no match is found then `false` is returned. Otherwise, the Date that the
 * episode was added to favourites is returned.
 *
 * @param {object} props
 * @param {object} props.list
 * @param {string} props.id
 */
const getSingle = (props) => {
  const { list, id } = props;
  if (list === null) return list;
  return list[id] || false;
};

export default {
  responseToList,
  getSingle,
};
