export const API_URL = process.env.NEXT_PUBLIC_COCKPIT_URL
export const API_TOKEN = process.env.NEXT_PUBLIC_COCKPIT_TOKEN

async function fetchUrl(url) {
    const res = await fetch(`${API_URL + url + "?token=" + API_TOKEN}`)
  
    const json = await res.json()
    if (json.errors) {
        console.error(json.errors)
        throw new Error('Failed to fetch API')
    }
  
    return json
}

export async function getSingletonData(singletonName) {
    const data = await fetchUrl(`${"/api/singletons/get/" + singletonName}`)

    return data
}