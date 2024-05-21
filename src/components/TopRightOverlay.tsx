import { Stream, VideoPlayer } from "@zoom/videosdk";
import { useContext, useEffect, useRef } from "react";
import { v4 } from "uuid";
import MediaStream from "../contexts/media-stream";

export interface TopRightOverlayProps {
  userId: number;
}

export function TopRightOverlay({ userId }: TopRightOverlayProps) {
  const containerId = v4();
  const mediaStream = useContext<typeof Stream>(MediaStream);
  const videoContainer = useRef<HTMLElement>();

  useEffect(() => {
    (async () => {
      const playerElement = await mediaStream.attachVideo(userId, 3);
      videoContainer.current?.appendChild(playerElement as VideoPlayer);
    })();
  }, [videoContainer]);

  return (
    <div className="flex items-center justify-center h-full bg-[#CBD5E1] rounded-lg shadow-lg">
      {/* @ts-ignore: React does not recognize custom Web component */}
      <video-player-container id={containerId} ref={videoContainer} />
    </div>
  );
}
