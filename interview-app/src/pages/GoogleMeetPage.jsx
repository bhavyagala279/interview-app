import { useEffect } from "react";

const GoogleMeetPage = () => {
  useEffect(() => {
    async function startDataCapture() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        console.log("Capturing data in background...", stream);
      } catch (error) {
        console.error("Error accessing webcam/microphone:", error);
      }
    }

    startDataCapture();

    // Redirect to Google Meet
    window.location.href = "https://meet.google.com/your-meeting-link"; // Replace with actual link
  }, []);

  return <h2>Redirecting to Google Meet...</h2>;
};

export default GoogleMeetPage;
