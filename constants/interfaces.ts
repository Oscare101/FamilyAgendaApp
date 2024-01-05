export interface Task {
  title: string
  id: string
  created: string
  author: string
  doneBy: string
  doneTime: string
  urgent: boolean
}

export interface Folder {
  name: string
  id: string
  task: any[]
  icon: string
  color: string
}

export interface Family {
  id: string
  name: string
  users: string[]
  admin: string
  password: string
  folder: Folder[]
}

export interface User {
  name: string
  email: string
  familiesId?: string[]
  currentFamilyId?: string
}
