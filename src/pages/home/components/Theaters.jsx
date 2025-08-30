import React, { useEffect, useState } from 'react'
import { theaterService } from '../../../service/theaterService'

const Theaters = ({ onTheaterSelect, selectedTheater }) => {
  const [theaters, setTheaters] = useState([])

  const fetchTheaters = async () => {
    try {
      const response = await theaterService.getListTheaters()
      setTheaters(response.data.content)
      if (response.data.content.length > 0 && !selectedTheater) {
        onTheaterSelect(response.data.content[0].maHeThongRap)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTheaters()
  }, [])

  return (
    <div className="flex flex-col space-y-4">
      {theaters.map((theater) => (
        <div 
          key={theater.maHeThongRap} 
          className={`flex justify-center p-2 cursor-pointer rounded ${
            selectedTheater === theater.maHeThongRap ? 'bg-blue-100 border-2 border-blue-500' : 'hover:bg-gray-100'
          }`}
          onClick={() => onTheaterSelect(theater.maHeThongRap)}
        >
          <img 
            src={theater.logo} 
            alt={theater.tenHeThongRap}
            className="w-16 h-16 object-contain"
          />
        </div>
      ))}
    </div>
  )
}

export default Theaters