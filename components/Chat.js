import ReactTimeago from "react-timeago";
import { useStore } from "../appStore";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { db } from "../firebase";

function Chat({ id, profilePic, username, timestamp, imageUrl, read }) {
	const router = useRouter();
	const snap = useStore((state) => state.snap);
	const setSnap = useStore((state) => state.setSnap);

	const open = () => {
		if (!read) {
			setSnap(imageUrl);
			setDoc(
				doc(db, "posts", id),
				{
					read: true,
				},
				{ merge: true }
			);
			router.push("/chats/view");
		}
	};
	return (
		<div onClick={open} className="flex items-center justify-between p-2 border-b border-gray-50 cursor-pointer hover:opacity-80">
			<div className="h-10 w-10">
				<img className="rounded-full" src={profilePic ? profilePic : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"} alt="" />
			</div>
			<div className="flex-1 p-3">
				<h4 className="font-bold">{username}</h4>
				<p className="text-sm text-gray-500">
					{!read && "Tap to view -"} <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} />
				</p>
			</div>

			{!read && <div className="bg-red-500 h-5 w-5 rounded-md"></div>}
		</div>
	);
}
export default Chat;
