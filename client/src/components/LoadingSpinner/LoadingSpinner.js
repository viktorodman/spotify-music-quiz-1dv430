import React from 'react'

export const LoadingSpinner = () => {
    return (
        <div className="text-center">
            <div className="spinner-border text-danger" role="status">
                <span className="sr-only">Loading...</span>
            </div>  
        </div> 
    )
}

export default LoadingSpinner
