import React from 'react'

const Alert = ({message,status}) => {
  return (
    <div className={`${status?"alert-success":"alert-danger "} alert  alert-dismissible fade show position-absolute w-100 `} role="alert">
  <strong>{message}</strong>
  <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
</div>

  )
}

export default Alert