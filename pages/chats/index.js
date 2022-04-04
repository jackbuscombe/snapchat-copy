import { SearchIcon, ChatIcon } from "@heroicons/react/solid";
import { useStore } from "../../appStore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import Chat from "../../components/Chat";
import { useRouter } from "next/router";

function Chats() {
	const user = useStore((state) => state.user);
	const [posts, setPosts] = useState([]);
	const auth = getAuth();
	const router = useRouter();

	useEffect(() => {
		const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
		onSnapshot(q, (snapshot) => {
			setPosts(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					data: doc.data(),
				}))
			);
		});
	});

	const takeSnap = () => {
		router.push("/");
	};

	return (
		<div className="flex flex-col">
			{/* Chats Header */}
			<div className="flex items-center justify-between p-4 bg-[#059ee0] text-white">
				{/* Avatar */}
				<div
					className="cursor-pointer hover:opacity-80"
					onClick={() => {
						signOut(auth);
						router.push("/");
					}}
				>
					<img className="h-8 w-8 rounded-full" src={user.photoURL} />
				</div>
				{/* Search */}
				<div className="flex flex-1 items-center pl-2">
					<SearchIcon className="h-6 w-6 mr-2" />
					<input className="outline-none bg-transparent border-none placeholder-white placeholder-opacity-100" type="text" placeholder="Friends" />
				</div>
				{/* Chat Bubble Icon */}
				<div>
					<ChatIcon className="h-6 w-6" />
				</div>
			</div>

			{/* Posts */}
			<div className="h-[359px] bg-white mt-[-9px] rounded-lg overflow-scroll no-scrollbar">
				{posts.map(({ id, data: { profilePic, username, timestamp, imageUrl, read } }) => (
					<Chat key={id} id={id} username={username} timestamp={timestamp} imageUrl={imageUrl} read={read} profilePic={profilePic} />
				))}
			</div>

			<div onClick={takeSnap} className="absolute bg-white bottom-32 left-[50%] transform -translate-x-[50%] cursor-pointer h-10 w-10 rounded-full border-4 border-gray-500 hover:opacity-80"></div>
		</div>
	);
}
export default Chats;
