import fetchAPI from "@@/lib/wp-api/index";

export type GetPost = { posts: { nodes: [{ content: string, title: string, featuredImage: { node: { mediaItemUrl: string } } }] } }
export type GetPosts = { posts: { edges: [{ node: { date: string, excerpt: string, slug: string, title: string, featuredImage: { node: { mediaItemUrl: string } } } }] } }

export async function getPost(name) {
    const data: GetPost = await fetchAPI(`
        query MyQuery($name: String) {
          posts(where: {name: $name}) {
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


export async function getPosts() {
    const data: GetPosts = await fetchAPI(`
        query MyQuery {
          posts {
            edges {
              node {
                excerpt
                slug
                title
                date
                featuredImage {
                  node {
                    mediaItemUrl
                  }
                }
              }
            }
          }
        }
    `,)
    return data
}