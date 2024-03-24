import React, { useCallback, useEffect } from 'react';
// import Popup, { Position, ToolbarItem } from 'devextreme-react/popup';
import { useDispatch } from 'react-redux';
import Router from 'next/router';
import { useTranslation } from 'next-i18next';
import { initialState, showPopup } from '../../reducers/global';
import { customAlert } from '../../utils/customDialogs';

const GlobalPopup = ({ content, redirect, shouldReplace }) => {
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  const onHideInfo = useCallback(async () => {
    dispatch(showPopup(initialState.popupContent));
    if (redirect) await Router[shouldReplace ? 'replace' : 'push'](redirect);
  }, [redirect]);
  useEffect(() => {
    const callAlertAndHideInfo = async () => {
      if (content) {
        await customAlert(
          t('global-popup.popup-title'),
          content,
          t('global-popup.ok'),
        );
      }
      await onHideInfo();
    };
    callAlertAndHideInfo();
  }, [content]);
  return (
    <>
    </>
    // <Popup
    //   visible
    //   onHiding={onHideInfo}
    //   dragEnabled={false}
    //   hideOnOutsideClick
    //   showCloseButton={false}
    //   showTitle
    //   container=".dx-viewport"
    //   width="500px"
    //   height="350px"
    //   titleRender={() => (
    //     <span className="tw-popup-title">{t('global-popup.popup-title')}</span>
    //   )}
    // >
    //   <Position
    //     at="center"
    //     my="center"
    //     of=".dx-viewport"
    //     collision="flipfit"
    //   />
    //   <ToolbarItem
    //     widget="dxButton"
    //     toolbar="bottom"
    //     location="after"
    //     options={{
    //       text: t('global-popup.ok'),
    //       onClick: onHideInfo,
    //     }}
    //   />
    //   <p className="tw-popup-content">{content}</p>
    // </Popup>
  );
};

export default GlobalPopup;
