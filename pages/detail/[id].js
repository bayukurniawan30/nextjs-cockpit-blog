import { useRouter } from 'next/router'
import Head from 'next/head'
import Title from '@components/title'

// set icon untuk stats
function Icon(stat) {
    if (stat == 'hp') {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        )
    }
    else if (stat == 'attack' || stat == 'special-attack') {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
            </svg>
        )
    }
    else if (stat == 'defense' || stat == 'special-defense') {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        )
    }
    else if (stat == 'speed') {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"  className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        )
    }
    else {
        return (
            <svg width="20" height="20" fill="currentColor" className="h-6 w-6" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
                </path>
            </svg>
        )
    }
}

function Detail({ data }) {
    // Hitung jumlah tipe yg dipunyain pokemon
    const typesLength = data.types.length;

	return (
		<div>
            {/* Ganti judul page sesuai nama pokemon */}
            <Head>
                <title>#{data.id} {data.name.toUpperCase()} | Pokédex</title>
            </Head>

			<div className="relative bg-white overflow-hidden">
				<div className="max-w-7xl mx-auto mt-10 mb-10">
                    <Title></Title>
                    <div className="relative bg-white dark:bg-gray-800 p-4">
                        <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-12 lg:items-center">
                            <div className="lg:col-start-2 md:pl-20">
                                <p className="text-indigo-500 text-md font-medium capitalize">
                                    {data.types.map(({ type, slot }) => (
                                        <span key={slot}>{type.name} {typesLength === slot ? "" : ' - '}</span>
                                    ))}
                                </p>
                                <h4 className="text-2xl leading-8 font-extrabold text-gray-900 dark:text-white tracking-tight sm:leading-9 capitalize">
                                    {data.name}
                                </h4>
                                <ul className="mt-10">
                                    {data.stats.map(({ stat, base_stat }) => (
                                    <li key={stat.name} className="mb-6">
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                                    {Icon(stat.name)}
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <h5 className="text-lg leading-4 text-gray-900 dark:text-white font-bold capitalize">
                                                    {stat.name}
                                                </h5>
                                                <p className="mt-2 text-base leading-3 text-gray-500 dark:text-gray-300">
                                                    {base_stat}
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-10 -mx-4 md:-mx-12 relative lg:mt-0 lg:col-start-1">
                                <img src={data.sprites.front_default} alt="illustration" className="relative mx-auto shadow-lg rounded w-80"/>
                            </div>
                        </div>
                    </div>
				</div>
			</div>
		</div>
	);
}

export async function getStaticPaths() {
	// cari detail data pokemon 
	const res     = await fetch("https://pokeapi.co/api/v2/pokemon/")
	const data    = await res.json();
    const allData = [];

	// masukkan data ke array yang baru
	let count = 0;
	for (const item of data.results) {
		const pokeUrl  = await fetch(item.url);
		const pokeData = await pokeUrl.json();
		allData[count++] = pokeData;
	}


	const paths = allData.map((pokemon) => ({
        params: { id: pokemon.id.toString() },
    }))
    
    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    const res  = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
    const data = await res.json()
  
    return { props: { data } }
  }

export default Detail