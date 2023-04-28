import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";

const Spinner = (props) => {
  return (
    <ClipLoader
    color='#97c3ba'
    loading={props.loading}
    aria-label="Loading Spinner"
    data-testid="loader"
  />
  )
}

export default Spinner
