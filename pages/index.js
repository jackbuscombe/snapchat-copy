import Head from "next/head";
import Image from "next/image";
import WebcamCapture from "../components/WebcamCapture";

export default function Home() {
	return (
		<div className="">
			<Head>
				<title>Snapchat</title>
				<meta name="description" content="Snapchat Copy" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<WebcamCapture />
		</div>
	);
}
