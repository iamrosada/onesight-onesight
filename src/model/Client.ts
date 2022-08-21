import mongoose from 'mongoose'
import { EventProps } from '../types'

const CalendarSchema = new mongoose.Schema<EventProps>({
  end: {
    type: Date
  },
  start: {
    type: Date
  },
  title: String,
  location: String,
  allDay: Boolean,
  isDeleted: Boolean,
  isConfirmed: Boolean,
  id: String,
  __v: Number
})
const Calendar = mongoose.models.Calendar as mongoose.Model<EventProps> || mongoose.model("Calendar", CalendarSchema)


export default Calendar