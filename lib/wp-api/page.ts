import fetchAPI from "@@/lib/wp-api/index";

export type GetPage = { pages: { nodes: [{ slug: string, content: string, title: string }] } }

export async function getPage(name) {
    const data: GetPage = await fetchAPI(`
        query MyQuery($name: String) {
          pages(where: {name: $name}) {
              nodes {
                content
                title
                slug
              }
          }
        }
    `, {variables: {name}})
    return data
}