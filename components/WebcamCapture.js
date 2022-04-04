import Webcam from "react-webcam";
import { useRef, useCallback, useEffect } from "react";
import { useStore } from "../appStore";
import { useRouter } from "next/router";
import { ChevronRightIcon } from "@heroicons/react/outline";

// const videoConstraints = {
// 	width: 250,
// 	height: 400,
// 	facingMode: "user",
// };

function WebcamCapture() {
	const router = useRouter();
	const image = useStore((state) => state.image);
	const setImage = useStore((state) => state.setImage);

	const videoRef = useRef();
	const photoRef = useRef();

	const getVideo = () => {
		navigator.mediaDevices
			.getUserMedia({
				video: {
					width: 250,
					height: 400,
				},
			})
			.then((stream) => {
				const video = videoRef.current;
				video.srcObject = stream;
				video.play();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getVideo();
	}, [videoRef]);

	const takePhoto = () => {
		const width = 250;
		const height = 400;

		const video = videoRef.current;
		const photo = photoRef.current;

		photo.width = width;
		photo.height = height;

		const ctx = photo.getContext("2d").drawImage(video, 0, 0, width, height);
		setImage(photoRef.current.toDataURL());
		router.push("/preview");
	};

	return (
		<div className="relative">
			<ChevronRightIcon onClick={() => router.push("/chats")} className="absolute z-10 top-5 right-3 text-white h-6 w-6 cursor-pointer hover:opacity-80" />
			<video className="h-96" ref={videoRef}></video>
			<div onClick={takePhoto} className="absolute bottom-0 left-[50%] transform -translate-x-[50%] -translate-y-[50%] cursor-pointer h-12 w-12 rounded-full border-4 border-white"></div>
			<canvas className="hidden" ref={photoRef}></canvas>
		</div>
	);
}
export default WebcamCapture;
