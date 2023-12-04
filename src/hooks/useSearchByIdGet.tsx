import { useState } from 'react'
import { IdentifictionDto } from '../dto/dto'
import axios from 'axios'
import toast from 'react-hot-toast'

const useSearchByIdGet = () => {
  const [userDataSearchId, setUserData] = useState<IdentifictionDto[] | null>(null)

  const notifyError = () => {
    toast.error('Not Found', { position: 'top-center', duration: 2000 })
  }

  const SubmitSearchId = async (search: string) => {
    try {
      const res = await axios.get<IdentifictionDto[]>(`http://localhost:8080/identification/searchbyid/${search}`)
      setUserData(res.data)
      if (res.status === 204) throw new Error()
    } catch (err) {
      setUserData(null)
      setTimeout(() => {
        notifyError()
      }, 500)
    }
  }

  return { userDataSearchId, SubmitSearchId }
}

export default useSearchByIdGet
