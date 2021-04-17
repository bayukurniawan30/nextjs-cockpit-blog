import Image from "next/image";
import Link from 'next/link'
import Title from '@components/title'

function IndexPage({ allData, moreData }) {
	// console.log(allData);
	// console.log(moreData);

	return (
		<div>
			<div className="relative bg-white overflow-hidden">
				<div className="max-w-7xl mx-auto mt-10 mb-10">
					<Title></Title>
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
						{/* Looping untuk menampilkan data pokemon */}
						{allData.map(({ id, name, sprites, types }) => (
						<div key={name}>
							<div className="overflow-hidden shadow-lg hover:shadow-xl transition duration-500 ease-in-out rounded-lg h-90 cursor-pointer m-auto">
								<a href="#" className="w-full block h-full">
									<Link href={"/detail/" + id}>
										<a><img alt={name} src={sprites.front_default} className="max-h-60 " width="100%"/></a>
									</Link>
									<div className="bg-white dark:bg-gray-800 w-full p-4">
										<p className="text-indigo-500 text-md font-medium capitalize">
											{types[0].type.name}
										</p>
										<p className="text-gray-800 dark:text-white text-xl font-medium mb-2 capitalize">
											<Link href={"/detail/" + id}>
												<a>
													{name}
												</a>
											</Link>
										</p>
										<p className="text-gray-400 dark:text-gray-300 font-light text-md">
											{moreData[id - 1].flavor_text_entries[0].flavor_text}
										</p>
									</div>
								</a>
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
	// cari data pokemon

	// set limitnya brapa
	const limit = 20
	// fetch pokemon API
	const res  = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}`)
	// ubah data ke format json
	const data = await res.json()
	const allData  = []
	const moreData = []

	// masukkan data ke array yang baru
	let count  = 0
	let count2 = 0
	for (const item of data.results) {
		const pokeUrl  = await fetch(item.url);
		const pokeData = await pokeUrl.json();

		const speciesUrl   = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeData.name}`)
		const speciesData  = await speciesUrl.json()
		allData[count++]   = pokeData
		moreData[count2++] = speciesData
	}
  
	// pass data ke IndexPage
	return {
		props: {
			allData,
			moreData
		},
	}
}

export default IndexPage