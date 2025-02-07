// create api which returns hello after 200 seconds

import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	setTimeout(() => {
		res.status(200).json({ message: "Hello" });
	}, 2000);
}
