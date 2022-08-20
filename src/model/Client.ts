import mongoose from 'mongoose'

const CalendarSchema = new mongoose.Schema({
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
})

const Calendar = mongoose.models.Calendar || mongoose.model("Calendar", CalendarSchema)

export default Calendar 