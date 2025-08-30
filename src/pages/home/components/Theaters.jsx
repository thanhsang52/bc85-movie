import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { theaterService } from '../../../service/theaterService'
import { setListTheatersAction, setSelectedTheaterAction } from '../../../stores/theater'

const Theaters = () => {
  const dispatch = useDispatch()
  const { listTheaters, selectedTheater } = useSelector(state => state.theaterSlice)

  const fetchTheaters = async () => {
    try {
      const response = await theaterService.getListTheaters()
      dispatch(setListTheatersAction(response.data.content))
      if (response.data.content.length > 0 && !selectedTheater) {
        dispatch(setSelectedTheaterAction(response.data.content[0].maHeThongRap))
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
      {listTheaters.map((theater) => (
        <div 
          key={theater.maHeThongRap} 
          className={`flex justify-center p-2 cursor-pointer rounded ${
            selectedTheater === theater.maHeThongRap ? 'bg-blue-100 border-2 border-blue-500' : 'hover:bg-gray-100'
          }`}
          onClick={() => dispatch(setSelectedTheaterAction(theater.maHeThongRap))}
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