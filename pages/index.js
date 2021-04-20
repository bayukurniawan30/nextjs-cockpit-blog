import Image from "next/image";
import Link from 'next/link'
import Head from "next/head";
import { IMAGE_PATH, getSingletonData, getCollectionData, getListUsers, getImageData } from "@lib/api"
import format from 'date-fns/format'

function IndexPage({ data, posts, popularPost }) {
	console.log(posts)
	return (
		<div>
			<Head>
				<title>{data.sitename}</title>
				<meta
				name="Description"
				content={data.description}
				/>
			</Head>

			<div className="container mx-auto pt-16">
				<div className="mb-12 xl:w-full w-11/12 mx-auto">
					<h1 className="xl:text-5xl text-3xl pt-4 xl:pt-0 text-gray-800 xl:text-left font-extrabold mb-4">Popular Blog Post</h1>
				</div>
				{popularPost.entries.map(popular => (
				<div key={popular.title_slug} className="relative bg-center bg-cover bg-no-repeat mb-40 w-11/12 mx-auto xl:w-full h-64">
					<Image
						className="h-full w-full object-cover overflow-hidden absolute rounded"
						src={IMAGE_PATH + popular.image.path}
						alt={popular.title}
						layout="responsive"
						width={1000}
						height={250}
					/>
					<div className="absolute bottom-0 w-11/12 ml-2 xl:mx-0 lg:mx-0 xl:w-6/12 lg:w-6/12 xl:ml-12 lg:ml-12 rounded-md lg:-mb-56 sm:-mb-48 -mb-64 xl:-mb-24">
						<div className="w-full py-5 px-6 bg-white shadow rounded">
							<p className="text-xl text-gray-800 font-bold pb-2">{popular.title}</p>
							<p className="text-base text-gray-600">{popular.excerpt}</p>
							<div className="pt-4 flex justify-between">
								<p className="text-sm text-gray-600">
									{format(new Date(popular._created * 1000), 'MMMM dd, yyyy') } by <span className="text-purple-700"> {popular.user[0].name}</span>
								</p>
							</div>
						</div>
					</div>
				</div>
				))}

				<div className="pt-32 md:pt-12 xl:pt-0 xl:w-full w-11/12 mx-auto border-b .border-gray-300">
					<p className="mb-4 font-bold text-gray-800 text-base">Latest Posts</p>
					<div className="xl:flex lg:flex sm:flex-1 md:flex flex-wrap justify-between">
						{posts.entries.map(post => (
						<div key={post.title_slug} className="lg:w-1/2 xl:w-1/4 mx-auto xl:mx-0 md:w-1/2 flex sm:mx-auto mb-6 items-center">
							<div className="h-16 w-20">
								<Image
									className="h-full w-full object-cover overflow-hidden rounded shadow"
									src={post.imageData}
									alt={post.title}
									width={300}
									height={300}
								/>
							</div>
							<div className="pt-3 pb-3 ml-2 pr-5">
								<p className="uppercase text-xs text-purple-700">{format(new Date(post._created * 1000), 'MMMM dd, yyyy')}</p>
								<p className="text-base text-gray-800">{post.title}</p>
							</div>
						</div>
						))}
					</div>
				</div>
			</div>
			
		</div>
	);
}

export async function getStaticProps() {
	const data  = await getSingletonData("website_information");
	const posts = await getCollectionData("posts", "post", { filter: {published:true}, limit:4 });
	const popularPost = await getCollectionData("posts", "post", { filter: {published:true}, limit:1 });

	let count = 0;
	for (const post of popularPost.entries) {
		const uploadedBy = post._by
		const user = await getListUsers("post", { filter: {_id:uploadedBy}, limit:1 });

		popularPost.entries[count++].user = user
	}

	let count2 = 0;
	for (const postdata of posts.entries) {
		const imageId  = postdata.image._id
		const imageData = await getImageData("post", { src:imageId, m:"thumbnail", w:200, h:200 });

		posts.entries[count2++].imageData = imageData
	}

	return {
		props: {
			data,
			posts,
			popularPost,
		},
	}
}

export default IndexPage