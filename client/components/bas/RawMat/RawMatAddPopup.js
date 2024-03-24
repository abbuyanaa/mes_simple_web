import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form, { ButtonItem, EmptyItem, GroupItem, SimpleItem } from 'devextreme-react/form';

import Popup, { Position, ToolbarItem } from 'devextreme-react/popup';
import ScrollView from 'devextreme-react/scroll-view';
import 'devextreme-react/text-area';
import { rawMatDeleteRequest, rawMatDetailSuccess, rawMatSaveRequest, rawMatUpdateRequest } from '../../../reducers/bas/rawMat';
// import useCallbackFocusInSelect from '../../../hooks/useCallbackFocusInSelect';
import { deepCopy } from '../../../utils/util';
import { customConfirm } from '../../../utils/customDialogs';

const RawMatAddPopup = ({ popupProps, setPopupProps }) => {
  const isFullScreen = useCallback(() => (
    window.innerHeight <= 750 || window.innerWidth <= 750
  ), []);

  if (typeof window !== 'undefined') {
    const formRef = React.useRef();
    const dispatch = useDispatch();

    const { detail } = useSelector((state) => state.bas.rawMat);

    const formDataMemo = useMemo(() => {
      if (detail) return deepCopy(detail);
      return ({
        raw_id: 0,
        rawknm: '',
        rawrem: '',
      });
    }, [detail]);

    const onHiding = useCallback(() => {
      dispatch(rawMatDetailSuccess());
      setPopupProps((prev) => ({ ...prev, visible: false, title: '' }));
    }, []);

    const onSaveOrUpdateBtnClick = useCallback(async () => {
      const { mat_id, matpnm } = formDataMemo;
      if (matpnm === '') {
        alert('원재료거래처명을 입력해 주십시오.');
        return undefined;
      }
      const dpatch = mat_id ? rawMatUpdateRequest : rawMatSaveRequest;
      dispatch(dpatch(formDataMemo));
    }, [formDataMemo]);

    const onDeleteBtnClick = useCallback(async () => {
      const result = await customConfirm('확인?', '삭제하시겠습니까?');
      if (result) {
        dispatch(rawMatDeleteRequest(formDataMemo));
      }
    }, [formDataMemo]);

    return (
      <Popup
        wrapperAttr={{ class: 'monitoring-popup' }}
        visible={popupProps.visible}
        dragEnabled={true}
        hideOnOutsideClick={false}
        onHiding={onHiding}
        showCloseButton={true}
        container=".dx-viewport"
        width="80vw"
        height="80vh"
        opacity={0.8}
        fullScreen={isFullScreen()}
      >
        <Position
          at="center"
          my="center"
        />
        <ToolbarItem
          location="center"
          toolbar="top"
          render={() => (<div className="mp-title">{popupProps.title}</div>)}
        />
        <ScrollView height="100%" width="100%">
          <Form
            ref={formRef}
            formData={formDataMemo}
            colCount={2}
          >
            <SimpleItem
              colSpan={2}
              label={{ text: '원재료거래처명' }}
              dataField="rawknm"
            />
            <SimpleItem
              colSpan={2}
              label={{ text: '원재료거래처명' }}
              dataField="rawrem"
              editorType="dxTextArea"
              editorOptions={{
                height: 100,
              }}
            />
            <EmptyItem colSpan={1} />
            <GroupItem colSpan={1} colCount={3}>
              <ButtonItem
                colSpan={1}
                verticalAlignment="center"
                horizontalAlignment="center"
                buttonOptions={{
                  text: formDataMemo.raw_id ? '수정' : '확인',
                  type: 'normal',
                  onClick: onSaveOrUpdateBtnClick,
                }}
              />
              <ButtonItem
                colSpan={1}
                verticalAlignment="center"
                horizontalAlignment="center"
                buttonOptions={{
                  text: '삭제',
                  type: 'normal',
                  disabled: !formDataMemo.raw_id,
                  onClick: onDeleteBtnClick,
                }}
              />
              <ButtonItem
                colSpan={1}
                verticalAlignment="center"
                horizontalAlignment="center"
                buttonOptions={{
                  text: '취소',
                  type: 'normal',
                  onClick: onHiding,
                }}
              />
            </GroupItem>
          </Form>
        </ScrollView>
      </Popup>
    );
  }
  return null;
};

export default RawMatAddPopup;
