import fetchAPI from "@@/lib/wp-api/index";

export type GetPost = { posts: { nodes: [{ content: string, title: string }] } }

export async function getPost(name) {
    const data: GetPost = await fetchAPI(`
        query MyQuery($name: String) {
          posts(where: {name: $name}) {
              nodes {
                content
                title
              }
          }
        }
    `, {variables: {name}})
    return data
}