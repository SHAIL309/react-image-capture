
import React, { useEffect, useRef, useState } from "react";

const NativeCameraCapture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    // Access webcam on mount
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("Error accessing webcam: ", err);
      });

    return () => {
      // Clean up video stream on unmount
      if (videoRef.current?.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const captureImage = () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, 640, 480);
    const imageDataUrl = canvasRef.current.toDataURL("image/jpeg");
    setImageData(imageDataUrl);
  };

  return (
    <div>
      <h2>Native Camera Capture</h2>
      <video ref={videoRef} width="640" height="480" autoPlay />
      <br />
      <button onClick={captureImage}>Capture</button>
      <canvas
        ref={canvasRef}
        width="640"
        height="480"
        style={{ display: "none" }}
      />
      {imageData && (
        <div>
          <h3>Captured Image:</h3>
          <img src={imageData} alt="Captured" />
        </div>
      )}
    </div>
  );
};

export default NativeCameraCapture;
