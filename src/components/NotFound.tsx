import MainLayout from "./MainLayout"
import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <MainLayout>
        <div className="w-full h-full flex items-center justify-center flex-1 flex-col gap-2">
            <p className="text-9xl font-semibold text-primary">404</p>
            <Link to="/" className="button-primary w-fit px-10 cursor-pointer">Go Home</Link>
        </div>
    </MainLayout>
  )
}

export default NotFound