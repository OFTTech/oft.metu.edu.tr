export default async function fetchAPI(query, {variables} = {variables: null}) {
    const headers = {'Content-Type': 'application/json'}
    const res = await fetch(process.env.WP_SITE + "/graphql", {
        method: 'POST',
        headers,
        body: JSON.stringify({
            query,
            variables
        }),
    })

    const json = await res.json()
    if (json.errors) {
        console.error(json.errors)
        throw new Error('Failed to fetch API')
    }
    return json.data
}
