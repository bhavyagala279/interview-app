import React, { useEffect, useRef, useState } from "react";

const AIInterview = () => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [micMuted, setMicMuted] = useState(true);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    async function startStream() {
      try {
        const userStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        videoRef.current.srcObject = userStream;
        setStream(userStream);

        // Send video & audio stream to backend
        sendStreamToBackend(userStream);
      } catch (error) {
        console.error("Error accessing webcam/microphone:", error);
      }
    }

    startStream();
  }, []);

  const toggleMic = () => {
    if (stream) {
      stream.getAudioTracks().forEach(track => (track.enabled = micMuted));
      setMicMuted(!micMuted);
    }
  };

  const sendStreamToBackend = async (stream) => {
    const mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm" });
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = async (event) => {
      if (event.data.size > 0) {
        const formData = new FormData();
        formData.append("video", event.data);
        try {
          await fetch("http://localhost:5000/upload-stream", {
            method: "POST",
            body: formData,
          });
        } catch (err) {
          console.error("Error streaming to backend:", err);
        }
      }
    };

    mediaRecorder.start(2000); // Send chunks every 2 seconds
  };

  return (
    <div style={styles.container}>
      <div style={styles.videoContainer}>
        <video ref={videoRef} autoPlay playsInline muted style={styles.video}></video>
      </div>

      <button onClick={toggleMic} style={{ ...styles.micButton, backgroundColor: micMuted ? "#ff4757" : "#28a745" }}>
        {micMuted ? "🔇 Mute" : "🎤 Mic On"}
      </button>
    </div>
  );
};

const styles = {
  container: {
    position: "relative",
    width: "100vw",
    height: "100vh",
    backgroundColor: "#f8f8f8",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  videoContainer: {
    position: "fixed",
    bottom: "20px",
    left: "20px",
    width: "auto",
    height: "auto",
    maxWidth: "320px", // Smaller webcam
    maxHeight: "240px", // Keeping natural aspect ratio
    backgroundColor: "black",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  },
  video: {
    width: "100%",
    height: "100%",
    objectFit: "contain", // Maintains aspect ratio, no cropping
    transform: "scaleX(-1)", // Mirror effect for natural webcam behavior
  },
  micButton: {
    position: "fixed",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    color: "white",
    padding: "12px 24px",
    fontSize: "18px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
};

export default AIInterview;
