import fetchAPI from "@@/lib/wp-api/index";

export type GetContentListPosts = { posts: { edges: [{ node: { featuredImage: { node: { mediaItemUrl: string } }, slug: string, id: string, title: string, content: string, excerpt: string, date: string } }] } }

export async function getContentList() {
    const data = await fetchAPI(`
        query MyQuery {
          posts {
            edges {
              node {
                slug
                title
                content
                excerpt
                date
                id
                featuredImage {
                    node {
                        mediaItemUrl
                    }
                }
              }
            }
          }
        }
    `)
    return data
}