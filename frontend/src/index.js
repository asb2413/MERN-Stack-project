import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { WorkoutContectProvider } from './components/context/WorkoutContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <WorkoutContectProvider>
           <App /> 
    </WorkoutContectProvider>
    
  
);


