/* eslint-disable react/destructuring-assignment */
import React, { useCallback } from 'react';
import { Toast } from 'devextreme-react/toast';
import Router from 'next/router';
import { useDispatch } from 'react-redux';

import { initialState, showToast } from '../../reducers/global';

const GlobalToast = (toastContent) => {
  const dispatch = useDispatch();
  const onToastHiding = useCallback(async () => {
    dispatch(showToast(initialState.toastContent));
    if (toastContent?.redirect) await Router[toastContent?.shouldReplace ? 'replace' : 'push'](toastContent.redirect);
  }, []);
  return (
    <Toast
      visible={false}
      type="success" // 'error' | 'info' | 'success' | 'warning'
      displayTime={1500}
      hideOnOutsideClick
      closeOnSwipe
      onHiding={onToastHiding}
      {...toastContent}
    />
  );
};

export default GlobalToast;
