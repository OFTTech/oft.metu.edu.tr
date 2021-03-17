import {NextApiRequest, NextApiResponse} from "next";
import {getEvents} from "@@/lib/wp-api/events";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const eventsList = await getEvents()
    res.status(200).json(eventsList)
}