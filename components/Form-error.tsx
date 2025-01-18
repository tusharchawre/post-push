import { FaExclamationTriangle } from "react-icons/fa"


export const FormError = ({message}: {message?: string}) => {
    return (
        <>
        <div className="w-full h-10 border-destructive/30 border rounded-md flex items-center bg-destructive/15 gap-2 px-4">
            <FaExclamationTriangle className='text-destructive/30 h-4 w-4'  />
            <p className='text-destructive/30 text-sm'>{message}</p>

        </div>
        </>
    )

}