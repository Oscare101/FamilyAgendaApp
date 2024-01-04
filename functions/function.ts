import { User } from '../constants/interfaces'

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

export function GetLastUpdated(timeStamp: string) {
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
  const lastUpdated = currentDate !== date ? date : time
  return lastUpdated
}
