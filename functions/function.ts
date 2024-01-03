import { User } from '../constants/interfaces'

export function NewUser(email: string) {
  const newUser: User = {
    email: email,
    name: '',
    familiesId: [],
  }

  return newUser
}
