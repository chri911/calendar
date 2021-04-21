import React from 'react';
import {wrapper} from '../components/store';
import '../styles/globals.scss';

function MyApp({ Component, pageProps}) {
  console.log('*******', pageProps)
  return (
    <Component {...pageProps} />
);
}

export default wrapper.withRedux(MyApp);
