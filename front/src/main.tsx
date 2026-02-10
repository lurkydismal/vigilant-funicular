import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';
import App from './App';
import './index.css';
import { enableInterceptors } from './interceptors';
import { log } from './stdlog';
import { apiGateway, isDev } from './stdvar';

enableInterceptors();

log.info(`Running ${isDev ? 'DEVELOPMENT' : 'PRODUCTION'} build`);

log.debug(`API gateway: '${apiGateway}'`);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <StyledEngineProvider injectFirst>
            <App />
        </StyledEngineProvider>
    </React.StrictMode>,
);
