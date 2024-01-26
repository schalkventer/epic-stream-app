import { useMount as useMountHook } from "react-use";
import { useEndpoints } from "./data.useEndpoints";
import { store } from "./data.store";

/**
 *
 */
export const useMount = () => {
  const endpoints = useEndpoints();

  useMountHook(async () => {
    const { favourites } = await endpoints.getLocal();
    store.setState({ favourites });

    const response = await endpoints.getPreviewsList();
    store.setState({ shows: response });
  });
};

export default {
  useMount,
};
