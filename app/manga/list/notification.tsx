'use client'

import React, { useEffect } from 'react'

interface NotificationProps {
  message: string
  visible: boolean
  onClose: () => void
}

const Notification: React.FC<NotificationProps> = ({
  message,
  visible,
  onClose,
}) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => onClose(), 3000) // Hide notification after 3 seconds
      return () => clearTimeout(timer)
    }
  }, [visible, onClose])
  return (
    <div
      className={`fixed bottom-4 right-0 p-4 bg-black border-[#ffd600] text-[#ffd600] 
        border-solid border-[1px] rounded shadow-lg transition-transform transform ${
          visible ? 'translate-x-0' : 'translate-x-full'
        }`}
      style={{ transition: 'transform 0.3s' }}
    >
      {message}
    </div>
  )
}

export default Notification
