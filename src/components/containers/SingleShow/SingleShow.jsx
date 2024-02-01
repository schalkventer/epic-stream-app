import { Dialog } from "@mui/material";

export const Component = () => (
  <div>
    <Dialog open>
      <video
        controls
        src="https://epic-stream-api.netlify.app/placeholder.mp4"
      />
    </Dialog>
  </div>
);

export default {
  Component,
};
