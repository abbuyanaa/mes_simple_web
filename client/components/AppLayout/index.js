import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Toolbar, { Item } from 'devextreme-react/toolbar';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Drawer from 'devextreme-react/drawer';
import DropDownButton from 'devextreme-react/drop-down-box';
import ScrollView from 'devextreme-react/scroll-view';
import { toggleFullScreen } from '../../utils/util';
import NavigationList from './NavigationList';

const localeLinks = [
  {
    id: 1,
    lang: '한국어',
    icon: '/images/flags/kr.png',
    locale: 'ko-KR',
  },
];

const Layout = ({ error, children }) => {
  const router = useRouter();
  const user = null;
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
