import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { locale, loadMessages } from 'devextreme/localization';
import enMessages from 'devextreme/localization/messages/en.json';

import AppLayout from './_appLayout';
import krMessages from '../public/messages/ko-KR.json';

/* predefined */
import 'devextreme/dist/css/dx.material.blue.dark.compact.css';

/* base & common */
import '../css/common.css';
import '../css/effects.css';
// import '../css/customicons.css';
import '../css/applayout.css';

/* pages */
import '../css/dashboard.css';
import '../css/report.css';
import '../css/fastreport.css';

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  useMemo(() => {
    switch (router.locale) {
    case 'en-US':
      loadMessages(enMessages);
      break;
    default:
      loadMessages(krMessages);
      break;
    }
    locale(router.locale);
    // axiosAPI.defaults.headers.common['Accept-Language'] = router.locale;
  }, [router.locale]);
  return (
    <>
      <AppLayout Component={Component} pageProps={pageProps} />
    </>
  );
};

export default App;
