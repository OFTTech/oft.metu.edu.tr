import fetchAPI from "@@/lib/wp-api/index";

export type GetPage = { pages: { nodes: [{ content: string, title: string }] } }

export async function getPage(name) {
    const data: GetPage = await fetchAPI(`
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