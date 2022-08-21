/* tslint:disable */
import type { NextApiRequest, NextApiResponse } from 'next'
import Calendar from '../../../model/Client'
import dbConnect from '../../../utils/database'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    method,
  } = req


  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const schedule = await Calendar.findById(id)
        if (!schedule) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: schedule })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT':

      try {
        const schedule = await Calendar.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!schedule) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: schedule })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE':
      try {
        const deletedSchedules = await Calendar.deleteOne({ _id: id })
        if (!deletedSchedules) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}
