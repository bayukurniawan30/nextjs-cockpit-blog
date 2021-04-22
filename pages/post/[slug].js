import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from "next/image";
import { IMAGE_PATH, getSingletonData, getCollectionData, getListUsers, getImageData } from "@lib/api"
import format from 'date-fns/format'
import markdownToHtml from "@lib/markdownToHtml"
import Avatar from 'react-avatar';

function Post({ webInfo, data, content }) {
    return (
		<div>
            <Head>
                <title>{data.title} | {webInfo.sitename}</title>
                <meta
				name="Description"
				content={webInfo.description}
				/>
            </Head>

            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -m-12">
                        <div className="p-12 w-full flex flex-col items-start">
                            <span className="inline-block py-1 px-2 rounded bg-red-50 text-red-500 text-xs font-medium tracking-widest">Published at {format(new Date(data._created * 1000), 'MMMM dd, yyyy') }</span>
                            <h2 className="sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-8">{data.title}</h2>

                            <Image
                                className="h-full w-full rounded-md"
                                src={IMAGE_PATH + data.image.path}
                                alt={data.title}
                                width={1000}
                                height={350}
                            />

                            <div className="leading-relaxed my-8" dangerouslySetInnerHTML={{ __html: content }}></div>

                            <a className="inline-flex items-center">
                                
                                <Avatar name={data.user[0].name} size="50" round={true} className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center" />
                                <span className="flex-grow flex flex-col pl-4">
                                    <span className="title-font font-medium text-gray-900">{data.user[0].name}</span>
                                    <span className="text-gray-400 text-xs tracking-widest mt-0.5">Author</span>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export async function getStaticPaths() {
    const posts = await getCollectionData("posts", "post", { filter: {published:true} });

    const paths = posts.entries.map((post) => ({
        params: { slug: post.title_slug },
    }))
    
    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
	const webInfo = await getSingletonData("website_information");
    const post = await getCollectionData("posts", "post", { filter: {title_slug:params.slug} });
    const data = post.entries[0];

    const uploadedBy = post.entries[0]._by
    const user = await getListUsers("post", { filter: {_id:uploadedBy}, limit:1 });

    data.user = user;

    const content = await markdownToHtml(data.content)

  
    return { props: { webInfo, data, content } }
}

export default Post