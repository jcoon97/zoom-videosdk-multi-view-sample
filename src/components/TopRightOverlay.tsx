import { VideoFeed, VideoFeedProps } from "./VideoFeed";

export type TopRightOverlayProps = VideoFeedProps;

export function TopRightOverlay({ userId }: TopRightOverlayProps) {
  return (
    <div className="flex items-center justify-center h-full">
      <VideoFeed userId={userId} />
    </div>
  );
}
