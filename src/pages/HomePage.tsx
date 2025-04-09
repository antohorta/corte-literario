import Home from "../components/Home";
import MainLayout from "../layout/MainLayout";

interface HomePageProps {
    title: string
}

const HomePage = (props: HomePageProps) => {
    document.title = props.title
    
    return (
        <MainLayout>
            <Home></Home>
        </MainLayout>
    )
}

export default HomePage;