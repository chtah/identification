import { useEffect, useState } from 'react'
import { IdentifictionDto } from '../dto/dto'
import axios from 'axios'

const useIdentificationGet = () => {
  const [userData, setUserData] = useState<IdentifictionDto[] | null>(null)

  const fetchData = async () => {
    try {
      const res = await axios.get<IdentifictionDto[]>(`http://localhost:8080/identification/getAll/`)
      setUserData(res.data)
      console.log(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { userData, fetchData }
}

export default useIdentificationGet
