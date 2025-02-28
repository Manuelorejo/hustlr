import Navbar from "../components/Navbar"
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

interface Props {
    children : React.ReactNode
    pageTitle ?: string
}

const MainLayout: React.FC<Props> = ({children, pageTitle}) => {
  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1)
  }
  return ( 
    <main className="relative">
        <Navbar/>
        <div className="lg:pt-24 min-h-svh py-6 px-4 flex flex-col">
          {
            pageTitle && (
              <button className="text-lg lg:text-2xl flex items-center gap-2 cursor-pointer" onClick={goBack}>
                <FaArrowLeftLong className="text-2xl" />
                {pageTitle}
              </button>
            )
          }
            {children}
        </div>
    </main>
  )
}

export default MainLayout