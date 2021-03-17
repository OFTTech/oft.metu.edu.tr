import fetchAPI from "@@/lib/wp-api/index";

export type GetEvent = { events: { nodes: [{ content: string, title: string, featuredImage: { node: { mediaItemUrl: string } } }] } }

export async function getEvent(name) {
    const data: GetEvent = await fetchAPI(`
        query MyQuery($name: String) {
          events(where: {name: $name}) {
              nodes {
                content
                title
                featuredImage {
                    node {
                        mediaItemUrl
                    }
                }
              }
          }
        }
    `, {variables: {name}})
    return data
}