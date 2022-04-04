import { useEffect } from "react";
import { useStore } from "../appStore";
import { useRouter } from "next/router";
import { XIcon, DocumentTextIcon, PencilIcon, DocumentAddIcon, MusicNoteIcon, PaperClipIcon, AdjustmentsIcon, ClockIcon, PaperAirplaneIcon } from "@heroicons/react/solid";
import { v4 as uuid } from "uuid";
import { db, storage } from "../firebase";
import { getStorage, ref, getDownloadURL, uploadString } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function Preview() {
	const image = useStore((state) => state.image);
	const setImage = useStore((state) => state.image);
	const router = useRouter();
	const storage = getStorage();

	const sendPost = () => {
		const id = uuid();
		const storageRef = ref(storage, `posts/${id}`);
		const uploadTask = uploadString(storageRef, image, "data_url");
		uploadTask.on(
			"state_changed",
			null,
			(error) => {
				// Error Function
				console.log(error);
			},
			() => {
				// On Complete function
				getDownloadURL(uploadTask.snapshot.ref).then((url) => {
					addDoc(collection(db, "posts"), {
						imageUrl: url,
						username: "Jack",
						read: false,
						// profilePic,
						timestamp: serverTimestamp(),
					});
					router.push("/chats");
				});
			}
		);
	};

	const closePreview = () => {
		setImage(null);
	};

	useEffect(() => {
		if (!image) {
			router.push("/");
		}
	}, [image, router]);
	return (
		<div className="relative">
			<XIcon className="h-6 w-6 absolute top-0 m-3 text-black cursor-pointer" onClick={closePreview} />
			{/* Preview Right Toolbar */}
			<div className="text-white absolute right-0 flex flex-col m-2">
				<DocumentTextIcon className="toolbar-icons" />
				<PencilIcon className="toolbar-icons" />
				<DocumentAddIcon className="toolbar-icons" />
				<MusicNoteIcon className="toolbar-icons" />
				<PaperClipIcon className="toolbar-icons" />
				<AdjustmentsIcon className="toolbar-icons" />
				<ClockIcon className="toolbar-icons" />
			</div>
			<img src={image} alt="Snap Image" />
			<div onClick={sendPost} className="absolute bottom-0 right-[25px] transform -translate-x-[50%] -translate-y-[50%] bg-yellow-400 text-black flex justify-evenly items-center rounded-lg p-2 cursor-pointer">
				<h2 className="text-sm mr-3">Send</h2>
				<PaperAirplaneIcon className="h-3 w-3" />
			</div>
		</div>
	);
}
export default Preview;
