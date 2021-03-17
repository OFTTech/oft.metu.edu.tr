import fetchAPI from "@@/lib/wp-api/index";

export type GetContentListPosts = { posts: { edges: [{ node: { id: string, title: string, content: string, excerpt: string, date: string } }] } }

export async function getContentList({type}: { type: "events" | "posts" }) {
    let data;
    if (type == "posts") {
        data = await fetchAPI(`
        query MyQuery {
          posts {
            edges {
              node {
                uri
                title
                content
                excerpt
                date
                id
              }
            }
          }
        }
    `)
    }
    return data
}