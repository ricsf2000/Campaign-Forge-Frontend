import './App.css';
import Layout from './components/Layout';
import { Routes, Route, Outlet } from 'react-router-dom';
import Home from './pages/home/Home';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Campaigns from './pages/campaigns/Campaigns';
import { NotFoundPage } from "./pages/not-found-page";
import { ProtectedRoutes } from './utils/ProtectedRoutes';
import { CallbackPage } from './pages/callback-page';
import CampaignView from './pages/campaignView/CampaignView';
import NewCampaign from './pages/newCampaign/NewCampaign';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<LayoutWithHeaderAndFooter />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/campaigns" element={<ProtectedRoutes component={Campaigns} />} />
            <Route path="/campaigns/:campaignId" element={<ProtectedRoutes component={CampaignView} />} />
            <Route path="/campaigns/new" element={<ProtectedRoutes component={NewCampaign}/>}/>
          </Route>
        </Route>
        <Route path="/callback" element={<CallbackPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

function LayoutWithHeaderAndFooter() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;