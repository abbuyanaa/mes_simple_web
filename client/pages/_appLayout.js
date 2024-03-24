import React, { useCallback, useMemo, useRef } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import Layout from '../components/AppLayout';
import menus from '../menu';
import { checkAuth } from '../utils/util';
import GlobalToast from '../components/common/GlobalToast';
import GlobalPopup from '../components/common/GlobalPopup';

const isMenuActive = (pathname, menu) => {
  const cleanAddr = (pathname.indexOf('/[id]') !== -1) ? pathname.substring(0, pathname.indexOf('/[id]')) : pathname;
  return (
    cleanAddr === menu.addr
    || (
      Array.isArray(menu.subMenus)
      && menu.subMenus.length > 0
      && menu.subMenus.some((subMenu) => isMenuActive(cleanAddr, subMenu))
    )
  );
};

const AppLayout = ({ Component, pageProps }) => {
  const { t } = useTranslation('common');
  const authRefs = useRef([]);
  const router = useRouter();
  const user = null;

  const { toastContent, popupContent } = useSelector((state) => state.global);

  const isAuthenticated = useCallback((menusWithLocale) => {
    let result = { value: false, code: 500, message: '' };
    const currentMenu = menusWithLocale?.find((menu) => isMenuActive(router.pathname, menu));
    if (currentMenu) {
      result.value = checkAuth(user, currentMenu);
      if (!result.value) {
        result.message = t('show-popup-content.under-grade'); // 403
        result.code = '403';
        if (currentMenu.admin) {
          result.message = t('show-popup-content.is-admin'); // 403
          result.code = '403';
        } else if (currentMenu.login === true) {
          if (currentMenu.grade > -1) {
            result.message = t('show-popup-content.under-grade'); // 403
            result.code = '403';
          } else {
            result.message = t('show-popup-content.is-logged-in'); // 401
            result.code = '401';
          }
        } else if (currentMenu.login === false) {
          result.message = t('show-popup-content.is-not-logged-in'); // 401
          result.code = '401';
        }
      } else if (Array.isArray(currentMenu.subMenus) && currentMenu.subMenus.length > 0) {
        result = isAuthenticated(currentMenu.subMenus);
      }
    } else {
      result.message = t('error-404.content');
      result.code = '404';
    }
    return result;
  }, [router.pathname, user, t]);

  const MainComp = useMemo(() => {
    const judgeAuth = isAuthenticated(menus[router.locale]);
    if (judgeAuth.value) {
      return (
        <Component authRefs={authRefs} {...pageProps} />
      );
    }
    // 오류 코드별로 화면 지정
    // switch (judgeAuth.code) {
    // case '401':
    //   return <Custom401 />;
    // case '403':
    //   return <Custom403 />;
    // case '404':
    //   return <Custom404 />;
    // default:
    //   return <Custom500 />;
    // }
  }, [router, user, authRefs.current]);

  return (
    <>
      <Layout authRefs={authRefs} error={pageProps?.error}>
        {MainComp}
      </Layout>
      {toastContent.visible && (<GlobalToast {...toastContent} />)}
      {popupContent.isShowing && (<GlobalPopup {...popupContent} />)}
    </>
  );
};

export default AppLayout;
