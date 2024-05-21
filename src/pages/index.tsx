import { MainLayout } from "$/components/MainLayout";
import { Stream, VideoClient } from "@zoom/videosdk";
import { useEffect, useState } from "react";
import MediaStream from "../contexts/media-stream";
import ZoomClient from "../contexts/zoom-client";

const getRandomInt = () => Math.floor(Math.random() * 10) + 1;

const SESSION_TOPIC = "My-Test-Session";
const PARTICIPANT_ROLE = 0;
const PARTICIPANT_NAME = `Participant-${getRandomInt()}`;

export default function HomePage() {
  const [jwt, setJwt] = useState<string | undefined>();
  const [zoomClient, setZoomClient] = useState<typeof VideoClient>();
  const [mediaStream, setMediaStream] = useState<typeof Stream>();

  // Fetch JWT when the page loads, and update JWT state
  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:4000/", {
        method: "POST",
        body: JSON.stringify({
          role: PARTICIPANT_ROLE,
          sessionName: SESSION_TOPIC,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const data: { signature: string } = await response.json();
      setJwt(data.signature);
    })();
  }, []);

  // Join the session with JWT, and update media stream
  useEffect(() => {
    if (!jwt) return;

    (async () => {
      const ZoomVideo = (await import("@zoom/videosdk")).default;
      const client = ZoomVideo.createClient();

      await client.init("en-US", "Global", { patchJsMedia: true });
      await client.join(SESSION_TOPIC, jwt, PARTICIPANT_NAME);

      setZoomClient(client);
      setMediaStream(client.getMediaStream());
    })();
  }, [jwt]);

  // TODO: Loading icon?
  if (!zoomClient || !mediaStream) return null;

  return (
    <ZoomClient.Provider value={zoomClient}>
      <MediaStream.Provider value={mediaStream}>
        <MainLayout />
      </MediaStream.Provider>
    </ZoomClient.Provider>
  );
}
