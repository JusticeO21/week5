import React, { ReactNode } from 'react'

type FormPreviewProps = {
    children:ReactNode
}

function FormPreview({children} : FormPreviewProps) {
  return (
      <form>
        {
            children
        }
     </form>
  )
}

export default FormPreview
