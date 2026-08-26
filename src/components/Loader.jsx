import { RotatingLines } from 'react-loader-spinner'

export default function Loader({loading}){
    return(
        <>
            {loading && <RotatingLines color='#3f51b5'/>}
        </>
    )
}