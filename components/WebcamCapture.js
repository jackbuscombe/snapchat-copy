import Webcam from "react-webcam";
import { useRef, useCallback } from "react";
import { useStore } from "../appStore";
import { useRouter } from "next/router";

const videoConstraints = {
	width: 250,
	height: 400,
	facingMode: "user",
};

function WebcamCapture() {
	const webcamRef = useRef(null);
	const router = useRouter();
	const image = useStore((state) => state.image);
	const setImage = useStore((state) => state.setImage);

	const capture = useCallback(() => {
		const imageSrc = webcamRef.current.getScreenshot();
		setImage(imageSrc);
		router.push("/preview");
	}, [webcamRef]);
	return (
		<div className="relative">
			<Webcam className="h-24 w-24" audio={false} height={videoConstraints.height} ref={webcamRef} screenshotFormat="image/jpeg" width={videoConstraints.width} videoConstraints={videoConstraints} />
			<div className="absolute bottom-0 left-[50%] transform -translate-x-[50%] -translate-y-[50%] cursor-pointer h-6 w-6 rounded-full border border-white" onClick={capture}></div>
		</div>
	);
}
export default WebcamCapture;
