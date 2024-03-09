import React, { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
// import { useSelector } from 'react-redux';
import TreeList, { Column } from 'devextreme-react/tree-list';

import menus from '../../menu';
import { checkAuth } from '../../utils/util';

const getMenu = (menusWithLocale, user) => menusWithLocale.filter((menu) => {
  const check = checkAuth(user, menu);
  if (check && Array.isArray(menu.subMenus) && menu.subMenus.length > 0) {
    menu.items = getMenu(menu.subMenus, user);
  }
  return check && (menu.addr || menu.items.length);
});

const isActiveMenu = (pathname, node) => (
  pathname === node.data.addr
  || (node.hasChildren && node.children.some((child) => isActiveMenu(pathname, child)))
);

const NavigationList = ({ setDrawerOpened }) => {
  const router = useRouter();
  const user = null;
  const mainMenu = useMemo(() => getMenu(menus[router.locale], user), [router.locale, user]);

  const onItemClick = useCallback((item) => async () => {
    if (item.data.addr) {
      const result = await router.push({
        pathname: item.data.addr,
        query: item.data.query,
      });
      if (result) setDrawerOpened(false);
    } else if (item.row.node.hasChildren) {
      if (item.row.isExpanded) item.component.collapseRow(item.row.node.key);
      else item.component.expandRow(item.row.node.key);
    }
  }, []);

  const itemRender = useCallback((item) => (
    <div
      className={isActiveMenu(router.pathname, item.row.node) ? 'sub-menu sub-menu-active' : 'sub-menu'}
      style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', cursor: 'pointer' }}
      onClick={onItemClick(item)}
      onKeyDown={null}
      role="button"
      tabIndex={0}
    >
      <i className={`dx-list-item-icon dx-icon dx-icon-${item.data.icon}`} />
      <span className="sub-menu-content">&nbsp;{item.data.name}</span>
      <span className="main-menu-content">&nbsp;{item.data.mainName}</span>
    </div>
  ), [router.pathname]);

  return (
    <div className="navigation-panel">
      <TreeList
        className="navigation-list"
        dataSource={mainMenu}
        showColumnHeaders={false}
        showRowLines
        showBorders
        columnAutoWidth
        hoverStateEnabled
        errorRowEnabled={false}
        itemsExpr="items"
        dataStructure="tree"
      >
        <Column cellRender={itemRender} />
      </TreeList>
    </div>
  );
};

export default NavigationList;
