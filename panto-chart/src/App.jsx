import { useState } from 'react'
import { useChartData } from './hooks/useChartData'
function App() {
 const charts = useChartData()
 console.log(charts)
  return <>chart</>
}

export default App
