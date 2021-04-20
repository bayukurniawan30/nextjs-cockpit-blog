import Image from "next/image";
import Link from 'next/link'
import Title from '@components/title'
import Head from "next/head";
import { getSingletonData } from "@lib/api"

function IndexPage({ data }) {
	return (
		<div>
			<Head>
				<title>{data.sitename}</title>
				<meta
				name="Description"
				content={data.description}
				/>
			</Head>
			
		</div>
	);
}

export async function getStaticProps() {
	const data = await getSingletonData("website_information");

	console.log(data)

	return {
		props: {
			data
		},
	}
}

export default IndexPage