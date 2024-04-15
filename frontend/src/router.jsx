import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import GameMenuPage from "./pages/GameMenuPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import NewGamePage from "./pages/NewGamePage";
import ContinuePage from "./pages/ContinuePage";
import StatsPage from "./pages/StatsPage";
import GameApp from "./GameApp";
import StatsGrid from "./components/StatsGrid";
import AGamePage from "./pages/AGamePage";

const router = createBrowserRouter([{
    path:'/',
    element: <App/>,
    children: [
        {
            index: true,
            element: <HomePage/>
        },
        {
            path: 'signup/',
            element: <SignupPage/>
        },
        {
            path: 'login/',
            element: <LoginPage/>
        },
        {
            path: 'game/',
            element: <GameApp/>,
            children: [
                {
                    index: true,
                    element: <GameMenuPage/>
                },
                {
                    path: 'profile/',
                    element: <ProfilePage/> 
                },
                {
                    path: 'settings/',
                    element: <SettingsPage/>
                },
                {
                    path: 'new-game/',
                    element: <NewGamePage/>
                },
                {
                    path: 'continue/',
                    element: <ContinuePage/>
                },
                {
                    path: 'stats/',
                    element: <StatsPage/>,
                },
                {
                    // TODO: change path to ':id'
                    path: ':id/',
                    element: <AGamePage/>
                }
            ]
        },
        
    ],
    errorElement: <ErrorPage/>
}]);

export default router;