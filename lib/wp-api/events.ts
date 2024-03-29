import fetchAPI from "@@/lib/wp-api/index";
import {query} from "@@/lib/db";

export type GetEvent = { events: { nodes: [{ slug: string, content: string, title: string, featuredImage: { node: { mediaItemUrl: string } } }] } }
export type GetEventsCategories = { categories: { edges: [{ node: { children: { edges: [{ node: { id: string, name: string } }] } } }] } }
export type GetEventsDB = [{ id: string, date: string, excerpt: string, slug: string, title: string, featuredImage: string }]
export type GetEvents = { events: GetEventsDB, categories: GetEventsCategories }

export async function getEvent(name) {
    const data: GetEvent = await fetchAPI(`
        query MyQuery($name: String) {
          events(where: {name: $name}) {
              nodes {
                content
                title
                slug
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

export async function getEvents({archive}: { archive?: any }) {
    const categories: GetEventsCategories = await fetchAPI(`
        query MyQuery {
          categories(where: {search: "Etkinlikler"}) {
            edges {
              node {
                children {
                  edges {
                    node {
                      id
                      name
                    }
                  }
                }
              }
            }
          }
        }
    `,)
    if (archive) {
        const results = (await query(
            "SELECT postmeta.meta_value as date," +
            "concat('" + process.env.NEXT_PUBLIC_S3_PREFIX + "',as3cf.path) as featuredImage," +
            "posts.post_title as title," +
            "posts.id as id," +
            "posts.post_content as excerpt," +
            "posts.post_name as slug FROM" + " bitnami_wordpress.wp_posts posts\n" +

            "inner join wp_postmeta postmeta\n" +
            "on posts.id=postmeta.post_id and postmeta.meta_key=\"tarih\"\n" +
            "left join wp_postmeta postmeta_thumbnail\n" +
            "on posts.id=postmeta_thumbnail.post_id and postmeta_thumbnail.meta_key=\"_thumbnail_id\"\n" +
            "left join wp_as3cf_items as3cf\n" +
            "on postmeta_thumbnail.meta_value=as3cf.source_id\n" +
            "where posts.post_status=\"publish\" " +
            "and postmeta.meta_value<=CURRENT_DATE()" +
            "order by postmeta.meta_value desc;"
        ) as GetEventsDB)
        return {events: results, categories}
    } else {
        const results = (await query(
            "SELECT postmeta.meta_value as date," +
            "concat('" + process.env.NEXT_PUBLIC_S3_PREFIX + "',as3cf.path) as featuredImage," +
            "posts.post_title as title," +
            "posts.post_content as excerpt," +
            "posts.post_name as slug FROM" + " bitnami_wordpress.wp_posts posts\n" +

            "inner join wp_postmeta postmeta\n" +
            "on posts.id=postmeta.post_id and postmeta.meta_key=\"tarih\"\n" +
            "left join wp_postmeta postmeta_thumbnail\n" +
            "on posts.id=postmeta_thumbnail.post_id and postmeta_thumbnail.meta_key=\"_thumbnail_id\"\n" +
            "left join wp_as3cf_items as3cf\n" +
            "on postmeta_thumbnail.meta_value=as3cf.source_id\n" +
            "where posts.post_status=\"publish\" " +
            "and postmeta.meta_value>=CURRENT_DATE()" +
            "order by postmeta.meta_value asc;"
        ) as GetEventsDB)
        return {events: results, categories}
    }
}