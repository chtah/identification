import axios from 'axios'
import { useState } from 'react'
import { IdentifictionDto } from '../dto/dto'
import toast from 'react-hot-toast'

const useIdentificationCreate = () => {
  const [isLoadingButton, setIsLodingButton] = useState<boolean>(false)

  const Submit = async (userData: IdentifictionDto) => {
    setIsLodingButton(true)

    const notifySubmit = () => {
      toast.success('Submitted Infomation', { position: 'top-center', duration: 2000 })
    }

    const notifyDuplicate = () => {
      toast.error('Duplicate ID', { position: 'top-center', duration: 2000 })
    }

    const notifyError = () => {
      toast.error('Cannot Submit', { position: 'top-center', duration: 2000 })
    }

    try {
      const res = await axios.post<IdentifictionDto>(`http://localhost:8080/identification/create`, userData)
      if (res.status === 202) {
        setTimeout(() => {
          notifyDuplicate()
        }, 500)
      } else {
        setTimeout(() => {
          notifySubmit()
        }, 500)
      }
    } catch (err) {
      setTimeout(() => {
        notifyError()
      }, 500)
    } finally {
      setIsLodingButton(false)
    }
  }

  return { isLoadingButton, Submit }
}

export default useIdentificationCreate
