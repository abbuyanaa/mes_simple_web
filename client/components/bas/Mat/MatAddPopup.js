import React, { useCallback, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Form, { ButtonItem, EmptyItem, GroupItem, SimpleItem } from 'devextreme-react/form';
import Popup, { Position, ToolbarItem } from 'devextreme-react/popup';
import ScrollView from 'devextreme-react/scroll-view';
import 'devextreme-react/radio-group';
import 'devextreme-react/lookup';
import 'devextreme-react/text-area';
import { matDeleteRequest, matDetailSuccess, matSaveRequest, matUpdateRequest } from '../../../reducers/bas/mat';
import { deepCopy } from '../../../utils/util';
import { customConfirm } from '../../../utils/customDialogs';

const useYN = [
  { value: 'Y', text: 'ON' },
  { value: 'N', text: 'OFF' },
];

const MatAddPopup = ({ popupProps, setPopupProps }) => {
  const isFullScreen = useCallback(() => (
    window.innerHeight <= 750 || window.innerWidth <= 750
  ), []);

  if (typeof window !== 'undefined') {
    const formRef = useRef();
    const dispatch = useDispatch();

    const rawList = useSelector((state) => state.bas.rawMat.list);
    const { detail } = useSelector((state) => state.bas.mat);

    const formDataMemo = useMemo(() => {
      if (detail) return deepCopy(detail);
      return ({
        mat_id: 0,
        bellyn: 'Y',
        matqty: 10,
        matknm: '',
        matunt: '',
        raw_id: 0,
        matrem: '',
      });
    }, [detail]);

    const onHiding = useCallback(() => {
      dispatch(matDetailSuccess());
      setPopupProps((prev) => ({ ...prev, visible: false, title: '' }));
    }, []);

    const onSaveOrUpdateBtnClick = useCallback(async () => {
      if (formDataMemo.maspnm === '') {
        alert('원재료명을 입력해 주십시오.');
        return undefined;
      }
      const dpatch = formDataMemo.mas_id ? matUpdateRequest : matSaveRequest;
      dispatch(dpatch(formDataMemo));
      onHiding();
    }, [formDataMemo]);

    const onDeleteBtnClick = useCallback(async () => {
      const result = await customConfirm('확인?', '삭제하시겠습니까?');
      if (result) {
        dispatch(matDeleteRequest(formDataMemo));
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
              colSpan={1}
              label={{ text: '원재료명' }}
              dataField="bellyn"
              editorType="dxRadioGroup"
              editorOptions={{
                dataSource: useYN,
                valueExpr: 'value',
                displayExpr: 'text',
                layout: 'horizontal',
              }}
            />
            <SimpleItem
              colSpan={1}
              label={{ text: '재고가 몇(이하일 때 알려드릴까요?' }}
              dataField="matqty"
              editorType="dxNumberBox"
            />
            <SimpleItem
              colSpan={2}
              label={{ text: '원재료명' }}
              dataField="matknm"
            />
            <SimpleItem
              colSpan={2}
              label={{ text: '단위' }}
              dataField="matunt"
            />
            <SimpleItem
              colSpan={2}
              label={{ text: '원재료거래처' }}
              dataField="raw_id"
              editorType="dxLookup"
              editorOptions={{
                dataSource: rawList,
                valueExpr: 'raw_id',
                displayExpr: 'rawknm',
              }}
            />
            <SimpleItem
              colSpan={2}
              label={{ text: '메모' }}
              dataField="matrem"
              editorType="dxTextArea"
              editorOptions={{ height: 100 }}
            />
            <EmptyItem colSpan={1} />
            <GroupItem colSpan={1} colCount={3}>
              <ButtonItem
                colSpan={1}
                verticalAlignment="center"
                horizontalAlignment="center"
                buttonOptions={{
                  text: formDataMemo.mat_id ? '수정' : '확인',
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
                  disabled: !formDataMemo.mat_id,
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

export default MatAddPopup;
