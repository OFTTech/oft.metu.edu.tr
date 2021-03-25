import {NextApiRequest, NextApiResponse} from "next";
import {SitemapStream, streamToPromise} from "sitemap"
import {Readable} from 'stream'
import fetchAPI from "@@/lib/wp-api";

type Menus = { menus: { edges: [{ node: { menuItems: { edges: [{ node: { path: string, connectedNode: { node: { uri: string } } } }] } } }] } }
type Events = { events: { edges: [{ node: { slug: string } }] } }
type Posts = { posts: { edges: [{ node: { slug: string } }] } }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const links = [{url: "/", changefreq: "daily", priority: 1}]

    const menus: Menus = await fetchAPI(`
        query MyQuery {
          menus(where: {slug: "nav"}) {
            edges {
              node {
                menuItems {
                  edges {
                    node {
                      path
                      connectedNode {
                        node {
                          uri
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
    `)
    menus.menus.edges[0].node.menuItems.edges.map((value) => {
        links.push({
            url: (value.node.connectedNode ? "/page" : "") + value.node.path,
            priority: 0.7,
            changefreq: "daily"
        })
    })

    const events: Events = await fetchAPI(`
        query MyQuery {
          events {
            edges {
              node {
                slug
              }
            }
          }
        }
    `)
    events.events.edges.map((value) => {
        links.push({url: "/events/" + value.node.slug, priority: 0.6, changefreq: "weekly"})
    })

    const posts: Posts = await fetchAPI(`
        query MyQuery {
          posts {
            edges {
              node {
                slug
              }
            }
          }
        }
    `)
    posts.posts.edges.map((value) => {
        links.push({url: "/posts/" + value.node.slug, priority: 0.4, changefreq: "monthly"})
    })

    const stream = new SitemapStream({hostname: "http://localhost:3000"})
    const resStream = await streamToPromise(Readable.from(links).pipe(stream))
    res.send(resStream.toString())
}