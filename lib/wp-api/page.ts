import fetchAPI from "@@/lib/wp-api/index";

export async function getPage(name) {
    const data: { pages: { nodes: [{ content: string, title: string }] } } = await fetchAPI(`
        query MyQuery($name: String) {
          pages(where: {name: $name}) {
              nodes {
                content
                title
              }
          }
        }
    `, {variables: {name}})
    return data
}