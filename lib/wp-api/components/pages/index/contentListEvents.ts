import {query} from "@@/lib/db";
import {GetEvents} from "@@/lib/wp-api/events";

export type GetContentListEvents = [{ id: string, date: string, excerpt: string, slug: string, title: string, featuredImage: string }]

export async function getContentListEvents() {
    const results = (await query(
        "SELECT postmeta.meta_value as date," +
        "concat('" + process.env.NEXT_PUBLIC_S3_PREFIX + "',as3cf.path) as featuredImage," +
        "posts.post_title as title," +
        "posts.post_content as excerpt," +
        "posts.id as id," +
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
    ) as GetEvents)
    return results
}