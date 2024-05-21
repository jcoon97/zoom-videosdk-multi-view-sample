import { Stream, VideoPlayer } from "@zoom/videosdk";
import { useContext, useEffect, useRef } from "react";
import { v4 } from "uuid";
import MediaStream from "../contexts/media-stream";

export interface VideoFeedProps {
  userId: number;
}

export function VideoFeed({ userId }: VideoFeedProps) {
  const containerId = v4();
  const mediaStream = useContext<typeof Stream>(MediaStream);
  const videoContainer = useRef<HTMLElement>();

  useEffect(() => {
    (async () => {
      const playerElement = await mediaStream.attachVideo(userId, 3);
      videoContainer.current?.appendChild(playerElement as VideoPlayer);
    })();
  }, [videoContainer]);

  // @ts-expect-error: React does not recognize custom Web component
  return <video-player-container id={containerId} ref={videoContainer} />;
}
