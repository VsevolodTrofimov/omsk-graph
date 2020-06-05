import React from 'react';
import './App.css';
import MapContainer from './MapContainer';
import Accordion from './Accordion';
import { RecoilRoot } from 'recoil';

export default function App() {
  return (
    <RecoilRoot>
      <div className="container1">
        <div style={{ width: 500, boxShadow: '2px 0 6px 0 rgba(0, 0, 0, 0.36)', zIndex: 1000, position: "relative" }} >
          <div className='box'>
            <Accordion />
          </div>
        </div>
        <MapContainer />
      </div>
    </RecoilRoot>
  )
}


