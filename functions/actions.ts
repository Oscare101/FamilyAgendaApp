import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth, db, storage } from '../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  set,
  ref,
  getDatabase,
  get,
  onValue,
  update,
  remove,
} from 'firebase/database'
import { ref as refStorage, deleteObject } from 'firebase/storage'
import { NewUser } from './function'
import { Task } from '../constants/interfaces'

// REGISTRATION LOGIN LOGOUT

export async function Registration(email: string, password: string) {
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password)
    await AsyncStorage.setItem('authentication', 'auto')

    await AsyncStorage.setItem('email', email)
    await AsyncStorage.setItem('password', password)
    await SetNewUser(email)
    return { response: response }
  } catch (error: any) {
    if (error.code.includes('email-already-in-use')) {
      return { error: 'email-already-in-use' }
    } else {
      return { error: 'error' }
    }
  }
}

export async function LogIn(email: string, password: string) {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password)
    await AsyncStorage.setItem('email', email)
    await AsyncStorage.setItem('password', password)
    return { response: response }
  } catch (error: any) {
    if (error.code.includes('wrong-password')) {
      return { error: 'wrong-password' }
    } else if (error.code.includes('user-not-found')) {
      return { error: 'user-not-found' }
    } else {
      return { error: 'error' }
    }
  }
}

export async function LogOut() {
  try {
    const response = await signOut(auth)
    await AsyncStorage.setItem('email', '')
    await AsyncStorage.setItem('password', '')
    return { response: response }
  } catch (error: any) {
    return { error: 'error' }
  }
}

// USER

export async function SetNewUser(email: string) {
  try {
    await set(
      ref(getDatabase(), 'user/' + email.replace('.', ',')),
      NewUser(email)
    )
  } catch (error) {
    console.log('SetNewUser', error)
  }
}

export async function UpdateUser(email: string, data: any) {
  try {
    update(ref(getDatabase(), 'user/' + email.replace('.', ',')), data)
  } catch (error) {
    console.log('UpdateUser', error)
  }
}

// FAMILY

export async function CreateFamily(data: any) {
  try {
    await set(ref(getDatabase(), `family/${data.id}`), data)
  } catch (error) {
    console.log('CreateFamily', error)
  }
}

export async function UpdateFamily(data: any) {
  try {
    update(ref(getDatabase(), `family/${data.id}`), data)
  } catch (error) {
    console.log('UpdateFamily', error)
  }
}

// FOLDER

export async function CreateFolder(familyId: string, data: any) {
  try {
    await set(ref(getDatabase(), `family/${familyId}/folder/${data.id}`), data)
  } catch (error) {
    console.log('CreateFolder', error)
  }
}

export async function UpdateFolder(familyId: string, data: any) {
  try {
    update(ref(getDatabase(), `family/${familyId}/folder/${data.id}`), data)
  } catch (error) {
    console.log('UpdateFolder', error)
  }
}

// TASKS

export async function CreateTask(
  familyId: string,
  folderId: string,
  data: Task
) {
  try {
    await set(
      ref(
        getDatabase(),
        `family/${familyId}/folder/${folderId}/task/${data.id}`
      ),
      data
    )
  } catch (error) {
    console.log('CreateTask', error)
  }
}

export async function UpdateTask(
  familyId: string,
  folderId: string,
  data: Task
) {
  try {
    update(
      ref(
        getDatabase(),
        `family/${familyId}/folder/${folderId}/task/${data.id}`
      ),
      data
    )
  } catch (error) {
    console.log('UpdateTask', error)
  }
}
