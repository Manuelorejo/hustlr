import Navbar from "../components/Navbar"

interface Props {
    children : React.ReactNode
}

const MainLayout: React.FC<Props> = ({children}) => {
  return (
    <main className="relative min-h-svh lg:flex gap-10 lg:divide-y divide-text">
        <Navbar/>
        <div className="flex-1">
            {children}
        </div>
    </main>
  )
}

export default MainLayout