import './App.css';
import api from './api/axiosConfig';
import Layout from './components/Layout';
import {Routes, Route} from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Campaigns from './components/campaigns/Campaigns';
import ProtectedRoutes from './utils/ProtectedRoutes';
import CampaignView from './components/campaignView/CampaignView'


function App() {
  return (
    <div className="App">
        <Header/>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home/>} ></Route>
            <Route element={<ProtectedRoutes/>}>
              <Route path='/campaigns' element={<Campaigns/>}/>
              <Route path="/campaigns/:campaignId" element={<CampaignView/>} />
            </Route>
          </Route>
        </Routes>
        <Footer/>
    </div>
  );
}

export default App;