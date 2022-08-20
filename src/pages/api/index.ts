import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from "../../utils/database"
import Calendar from '../../model/Client'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req
  await dbConnect()
  switch (method) {
    case 'GET':
      try {
        const schedule = await Calendar.find({})
        res.status(200).json({ success: true, data: schedule })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const schedule = await Calendar.create(
          req.body
        )
        res.status(201).json({ success: true, data: schedule })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
