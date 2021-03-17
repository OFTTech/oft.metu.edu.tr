import {NextApiRequest, NextApiResponse} from "next";
import {getPosts} from "@@/lib/wp-api/posts";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const postsList = await getPosts()
    res.status(200).json(postsList)
}