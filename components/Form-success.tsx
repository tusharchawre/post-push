import { CircleCheck } from 'lucide-react';


export const FormSuccess = ({message}: {message: string}) => {
    return (
        <>
        <div className="w-full h-10 border-emerald-200/50 border rounded-md flex items-center bg-emerald-100 gap-2 px-4">
            <CircleCheck className='text-emerald-400 h-4 w-4'  />
            <p className='text-emerald-400 text-sm'>{message}</p>

        </div>
        </>
    )

}