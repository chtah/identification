import axios from 'axios'
import { useState } from 'react'
import { IdentifictionDto } from '../dto/dto'
import toast from 'react-hot-toast'

const useIdentificationDelete = () => {
  const [isLoadingButton, setIsLodingButton] = useState<boolean>(false)

  const SubmitDelete = async (id_number: string) => {
    setIsLodingButton(true)

    const notifySubmit = () => {
      toast.success('Deleted', { position: 'top-center', duration: 1500 })
    }

    const notifyNoIdNumber = () => {
      toast.error('Not found ID Number', { position: 'top-center', duration: 2000 })
    }

    const notifyError = () => {
      toast.error('Cannot Submit', { position: 'top-center', duration: 2000 })
    }

    try {
      const res = await axios.delete<IdentifictionDto[]>(`http://localhost:8080/identification/delete`, {
        data: { identification_number: id_number },
      })
      if (res.status === 202) {
        setTimeout(() => {
          notifyNoIdNumber()
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

  return { isLoadingButton, SubmitDelete }
}

export default useIdentificationDelete
