import { useContext } from "react"
import { useNotificationValue } from "../NotificationContext"

const Notification = () => {
  const notification = useNotificationValue()
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  if (notification === '') return null


  return (

    <div style={style}>
      {console.log('state', notification)}
      {notification}
    </div>
  )
}

export default Notification
