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
        <div className="lg:pt-20 min-h-svh flex flex-col">
          {
            pageTitle && (
              <button className="text-lg lg:text-2xl flex items-center gap-2 cursor-pointer mb-2 lg:mb-5 font-semibold p-10" onClick={goBack}>
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