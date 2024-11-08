// script.js
const video = document.getElementById("video");
const prediction = document.getElementById("prediction");
const confidence = document.getElementById("confidence");

if (video) {
  // Access the device camera and stream to the video element
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      video.srcObject = stream;
    })
    .catch((error) => console.error("Error accessing the webcam:", error));
} else {
  console.error("Video element not found.");
}

function captureImage() {
  if (video && video.srcObject) {
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      const formData = new FormData();
      formData.append("image", blob, "frame.jpg");
console.log("Hello world");
      fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (prediction && confidence) {
            prediction.innerText = `Prediction: ${data.prediction}`;
            confidence.innerText = `Confidence: ${data.confidence.toFixed(2)}`;
          }
        })
        .catch((error) => console.log("Error:", error));
    });
  } else {
    console.error("Cannot capture image: video stream not available.");
  }
}
