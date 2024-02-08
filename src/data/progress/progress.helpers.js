const MINUTE_AS_SECONDS = 60;
const HOUR_AS_SECONDS = MINUTE_AS_SECONDS * 60;

const convertId = {
  /**
   *
   * @param {object} props
   * @param {string} props.episode
   * @param {string} props.show
   */
  toId: (props) => `${props.show}_${props.episode}`,

  /**
   *
   * @param {string} props
   */
  toProperties: (props) => {
    const [show, episode] = props.split("_").map((inner) => inner.trim());
    return { show, episode };
  },
};

/**
 * Various methods that can be used to convert the time values used by
 * `progress`.
 */
const convertTime = {
  /**
   * Takes a specific amount of seconds and a total amount of seconds.
   * Calculates the percentage elapsed of the total as percentage (between 0 -
   * 100).
   *
   * @param {number} seconds
   * @param {number} total
   * @returns {number}
   */
  toPercentage: (seconds, total) => (seconds / total) * 100,

  /**
   * Takes a specific percentage (between 0 - 100)  and a total amount of
   * seconds. Calculates amount of seconds the percentage represents and returns
   * it as a number.
   *
   * @param {number} percentage
   * @param {number} total
   * @returns {number}
   */
  toSeconds: (percentage, total) => (percentage / 100) * total,

  /**
   * Takes a total amount of seconds and returns it as a string that shows, the
   * amount as hours, minutes and seconds. For example, 4000 seconds would be
   * returned as "01:06:40".
   *
   * @param {number} seconds
   * @returns {string}
   */
  toHourString: (seconds) => {
    const hour = Math.floor(seconds / HOUR_AS_SECONDS);
    const minutes = Math.floor((seconds % HOUR_AS_SECONDS) / MINUTE_AS_SECONDS);

    const remainingSeconds = Math.floor(
      (seconds % HOUR_AS_SECONDS) % MINUTE_AS_SECONDS,
    );

    return [hour, minutes, remainingSeconds]
      .map((inner) => inner.toString().padStart(2, "0"))
      .join(":");
  },
};

export default {
  convertTime,
  convertId,
};
