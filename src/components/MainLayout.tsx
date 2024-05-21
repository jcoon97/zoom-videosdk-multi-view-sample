import {
  event_peer_video_state_change,
  Stream,
  VideoClient,
} from "@zoom/videosdk";
import { useContext, useEffect, useState } from "react";
import MediaStream from "../contexts/media-stream";
import ZoomClient from "../contexts/zoom-client";
import { TopRightOverlay } from "./TopRightOverlay";

type PeerVideoStateChangeHandler = Parameters<
  typeof event_peer_video_state_change
>["0"];

export function MainLayout() {
  const zoomClient = useContext<typeof VideoClient>(ZoomClient);
  const mediaStream = useContext<typeof Stream>(MediaStream);

  const [videoFeeds, setVideoFeeds] = useState<number[]>([]);

  // Start our current video when the page loads
  useEffect(() => {
    (async () => {
      await mediaStream.startVideo();
      setVideoFeeds((videoFeeds) => [
        ...videoFeeds,
        zoomClient.getCurrentUserInfo().userId,
      ]);
    })();
  }, []);

  // Register our event handler for video starting
  useEffect(() => {
    const handlePeerVideoStateChanged = ({
      action,
      userId,
    }: PeerVideoStateChangeHandler) => {
      setVideoFeeds((videoFeeds) =>
        action === "Start"
          ? [...videoFeeds, userId]
          : videoFeeds.filter((id) => id !== userId)
      );
    };

    zoomClient.on("peer-video-state-change", handlePeerVideoStateChanged);

    return () => {
      zoomClient.off("peer-video-state-change", handlePeerVideoStateChanged);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-[#999] flex items-center justify-center">
      <div className="fixed top-8 right-8 w-[10vw] h-[10vh] space-y-5">
        {videoFeeds.map((userId) => (
          <TopRightOverlay key={userId} userId={userId} />
        ))}
      </div>
    </div>
  );
}
