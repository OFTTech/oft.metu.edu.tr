import {NextApiRequest, NextApiResponse} from "next";
import {getContentList} from "@@/lib/wp-api/components/pages/index/contentList";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const contentList = await getContentList()
    res.status(200).json(contentList)
}