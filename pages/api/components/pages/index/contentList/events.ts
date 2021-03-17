import {NextApiRequest, NextApiResponse} from "next";
import {getContentListEvents} from "@@/lib/wp-api/components/pages/index/contentListEvents";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const contentList = await getContentListEvents()
    res.status(200).json(contentList)
}