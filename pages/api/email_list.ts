import {NextApiRequest, NextApiResponse} from "next";
import {query} from "@@/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const results = await query(
            `
                INSERT INTO email_list (email)
                VALUES (?)
                `,
            [(req.query.email as any)]
        )
        return res.json(results)

    } catch (e) {
        res.status(500).json({message: e.message})
    }
}