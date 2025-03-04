import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Estilos globais (opcional)
import App from './App'; // Componente App principal
import { BrowserRouter as Router } from 'react-router-dom'; // Importando o BrowserRouter
import { Provider } from 'react-redux';
import store from "./redux/store"; // Importando o Provider do Redux

const rootElement = document.getElementById('root');

const root = ReactDOM.createRoot(rootElement);

root.render(
    <Provider store={store}> {/* Envolvendo o App com o Provider */}
        <Router>
            <App />
        </Router>
    </Provider>
);
