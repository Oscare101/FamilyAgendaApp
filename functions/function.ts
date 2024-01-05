import { Task, User } from '../constants/interfaces'
import text from '../constants/text'

export function NewUser(email: string) {
  const newUser: User = {
    email: email,
    name: '',
    familiesId: [],
  }

  return newUser
}

export function GetDateTime(timeStamp: string) {
  const D = new Date(+timeStamp)
  const date = `${D.getFullYear()}-${(D.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${D.getDate().toString().padStart(2, '0')}`
  const time = `${D.getHours().toString().padStart(2, '0')}:${D.getMinutes()
    .toString()
    .padStart(2, '0')}`
  return { date: date, time: time }
}

export function GetLastUpdated(timeStamp: string, language: string) {
  const currentD = new Date()
  const currentDate = `${currentD.getFullYear()}-${(currentD.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${currentD.getDate().toString().padStart(2, '0')}`

  const D = new Date(+timeStamp)
  const date = `${D.getFullYear()}-${(D.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${D.getDate().toString().padStart(2, '0')}`
  const time = `${D.getHours().toString().padStart(2, '0')}:${D.getMinutes()
    .toString()
    .padStart(2, '0')}`

  const startOfToday = new Date(
    currentD.getFullYear(),
    currentD.getMonth(),
    currentD.getDate()
  )
  const startOfYesterday = new Date(currentD)
  startOfYesterday.setDate(currentD.getDate() - 1)
  startOfYesterday.setHours(0, 0, 0, 0)
  if (D >= startOfYesterday && D < startOfToday) {
    return text[language].Yesterday
  }
  const lastUpdated = currentDate !== date ? date : time
  return lastUpdated
}

export function GetSortedTasks(tasks: Task[]) {
  const doneTasks = Object.values(tasks)
    .filter((t: Task) => t.doneBy)
    .sort((a: Task, b: Task) => +b.created - +a.created)
  const urgentTasks = Object.values(tasks)
    .filter((t: Task) => t.urgent && !t.doneBy)
    .sort((a: Task, b: Task) => +b.created - +a.created)
  const otherTasks = Object.values(tasks)
    .filter((t: Task) => !t.urgent && !t.doneBy)
    .sort((a: Task, b: Task) => +b.created - +a.created)
  return [...urgentTasks, ...otherTasks, ...doneTasks]
}
