async function fetchAPI(url, fetchMethod = 'GET') {
    const res = await fetch(`${process.env.NEXT_PUBLIC_COCKPIT_URL + url + "&token=" + process.env.NEXT_PUBLIC_COCKPIT_TOKEN}`)
  
    const json = await res.json()
    if (json.errors) {
        console.error(json.errors)
        throw new Error('Failed to fetch API')
    }
  
    return json.data
}

export async function getSingletonData(singletonName) {
    const data = fetchAPI(`${"/api/singletons/get/" + singletonName}`)

    return data
}