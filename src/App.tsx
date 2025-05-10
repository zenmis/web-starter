import { useState } from 'react'

function App() {
  const [data, setData] = useState()

  const fetchData = () => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => setData(data))
  }

  return (
    <>
      <button onClick={fetchData}>Fetch /api</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}

export default App
