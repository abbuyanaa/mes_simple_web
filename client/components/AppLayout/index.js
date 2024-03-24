import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Toolbar, { Item } from 'devextreme-react/toolbar';
// import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { axiosAPI } from '../../api';
import { useTranslation } from 'next-i18next';

// import Link from 'next/link';
import Drawer from 'devextreme-react/drawer';
// import DropDownButton from 'devextreme-react/drop-down-box';
import ScrollView from 'devextreme-react/scroll-view';
import { toggleFullScreen } from '../../utils/util';
import NavigationList from './NavigationList';
import { showToast } from '../../reducers/global';

// const localeLinks = [
//   {
//     id: 1,
//     lang: '한국어',
//     icon: '/images/flags/kr.png',
//     locale: 'ko-KR',
//   },
// ];

const Layout = ({ /* error, */ children }) => {
  const { t } = useTranslation(['common']);
  const dispatch = useDispatch();
  // const router = useRouter();
  // const user = null;
  // const [showLoginForm, setShowLoginForm] = useState(false);
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [toolbarClass, setToolbarClass] = useState(['main-toolbar']);

  // const selectedItem = useMemo(() => localeLinks
  //   .find((v) => v.locale === router.locale) || localeLinks[0], [router.locale]);

  const onMenuClick = useCallback(() => setDrawerOpened((pre) => !pre), []);

  // const headerRender = useCallback(() => (
  //   <Link href="/">
  //     <h3>
  //       <img width="100%" height="100%" src="" alt="" />
  //     </h3>
  //   </Link>
  // ), []);

  // const dropDownRender = useCallback(() => (
  //   <DropDownButton
  //     icon="menu"
  //     className="tw-change-language"
  //     keyExpr="id"
  //     displayExpr="lang"
  //     useSelectMode
  //     selectedItemKey={selectedItem.id}
  //     items={localeLinks}
  //     stylingMode="contained"
  //     onItemClick={onDropDownItemClick}
  //   />
  // ), [router]);
  // const userRender = useCallback(() => user && (<UserForm name={user.user_nm} />), [user]);

  const drawerRender = useCallback(() => (
    <NavigationList setDrawerOpened={setDrawerOpened} />
  ), []);

  useMemo(() => {
    const requestInterceptor = axiosAPI.interceptors.request.use((conf) => {
      // dispatch(loadingInProgress({
      //   isLoading: true,
      //   title: t('app-layout.axios-title'),
      //   message: t('app-layout.axios-message'),
      // }));
      return conf;
    }, (err) => {
      // console.error(err);
      // dispatch(loadingInProgress({
      //   isLoading: false,
      // }));
      dispatch(showToast({
        visible: true,
        message: t('error-network'),
        type: 'error',
      }));
      return Promise.reject(err);
    });

    const responseInterceptor = axiosAPI.interceptors.response.use((conf) => {
      // dispatch(loadingInProgress({
      //   isLoading: false,
      // }));
      return conf;
    }, (err) => {
      // console.error(err);
      // dispatch(loadingInProgress({
      //   isLoading: false,
      // }));
      dispatch(showToast({
        visible: true,
        message: t('error-network'),
        type: 'error',
      }));
      return Promise.reject(err);
    });
    return () => {
      axiosAPI.interceptors.request.eject(requestInterceptor);
      axiosAPI.interceptors.response.eject(responseInterceptor);
    };
  }, [t]);

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY === 0) setToolbarClass(['main-toolbar']);
      else setToolbarClass(['main-toolbar', 'moved']);
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  return (
    <>
      <Toolbar className={toolbarClass.join(' ')}>
        <Item
          widget="dxButton"
          location="before"
          options={{ icon: 'menu', onClick: onMenuClick }}
        />
        <Item
          widget="dxButton"
          location="center"
          // render={headerRender}
          options={{ icon: 'home' }}
        />
        {/* <Item location="after" render={userRender} /> */}
        {/* <Item
          location="after"
          locateInMenu="auto"
          render={dropDownRender}
        /> */}
        {/* <Item location="after" locateInMenu="auto" render={dropDownRender} /> */}
        <Item
          widget="dxButton"
          location="after"
          locateInMenu="auto"
          options={{
            icon: 'fullscreen',
            onClick: toggleFullScreen,
          }}
        />
      </Toolbar>
      <Drawer
        className="menu-drawer"
        opened={drawerOpened}
        openedStateMode="overlap" // push
        position="left"
        revealMode="slide"
        render={drawerRender}
        closeOnOutsideClick={() => setDrawerOpened(false)}
      >
        <ScrollView className="menu-drawer-scroll-view" direction="both" showScrollbar="onHover">
          <div className="main-box">{children}</div>
        </ScrollView>
      </Drawer>
    </>
  );
};

export default Layout;
