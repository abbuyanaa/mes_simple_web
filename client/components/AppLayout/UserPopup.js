import React, { useCallback } from 'react';
// import { useDispatch } from 'react-redux';
import Button from 'devextreme-react/button';
import Popup, { Position } from 'devextreme-react/popup';
// import { useTranslation } from 'next-i18next';
import Router from 'next/router';
// import { logoutRequest } from '../../reducers/user';

const UserPopup = ({ userName, setShowPopup }) => {
  // const { t } = useTranslation('common');
  // const dispatch = useDispatch();
  const onHiding = useCallback(() => setShowPopup(false), []);

  const onLogOut = useCallback(async () => {
    await Router.replace('/');
    // dispatch(logoutRequest);
  }, []);

  const getPopupWidth = useCallback((length) => {
    const px = length * 20;
    if (px < 150) return '150px';
    return `${px}px`;
  }, []);

  const titleRender = useCallback(() => (<span>{userName}</span>), []);

  return (
    <Popup
      visible
      onHiding={onHiding}
      dragEnabled={false}
      hideOnOutsideClick
      showCloseButton={false}
      showTitle
      shading={false}
      titleRender={titleRender}
      container=".dx-viewport"
      width={getPopupWidth(userName.length)}
      height="auto"
    >
      <Position
        at="right bottom"
        my="right top"
        of=".tw-avatar-name"
      />
      <Button
        // text={t('user-popup.logout-button')}
        text="로그아웃"
        type="success"
        onClick={onLogOut}
      />
    </Popup>
  );
};

export default UserPopup;
