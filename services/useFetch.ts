import { useEffect, useState } from "react"

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      const result = await fetchFunction()
      setData(result)
    } catch (error: unknown) {
      // Proper error handling to ensure `error` is of type `Error`
      setError(error instanceof Error ? error : new Error('An error occurred'))
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setData(null)
    setLoading(false)
    setError(null)
  }

  useEffect(() => {
    if (autoFetch) {
      fetchData()
    }
  }, [autoFetch])

  return { data, loading, error, refetch: fetchData, reset }
}

export default useFetch
