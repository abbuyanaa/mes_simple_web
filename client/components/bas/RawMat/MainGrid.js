import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataGrid, { Column } from 'devextreme-react/data-grid';
import defaultDataGridProps from '../../config/DataGridConfig';
import RawMatAddPopup from './RawMatAddPopup';
import { rawMatDetailRequest } from '../../../reducers/bas/rawMat';

const onEditorPreparing = (e) => {
  if (e.command === 'select' && e.parentType === 'headerRow') {
    // e.editorOptions.disabled = true;
    // e.editorOptions.elementAttr.class = 'unselect-all';
    e.editorOptions.elementAttr.visible = false;
  }
  if (e.command === 'select' && e.parentType === 'dataRow' && e.row) {
    e.editorOptions.visible = false;
    // if (e.row.data?.CFM_YN === 'Y') {
    //   e.editorOptions.value = false;
    //   e.editorOptions.disabled = true;
    // }
  }
};

const MainGrid = () => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.bas.rawMat.list);
  const [addPopupProps, setAddPopupProps] = useState({ visible: false, title: '' });

  const onToolbarPreparing = useCallback(({ toolbarOptions }) => {
    const addButton = toolbarOptions.items.find((item) => item.name === 'addRowButton');
    if (addButton) {
      addButton.options.onClick = () => {
        setAddPopupProps({
          visible: true,
          title: '원재료거래처 등록',
        });
      };
    }
  }, []);

  const onRowDblClick = useCallback(({ data }) => {
    dispatch(rawMatDetailRequest(data));
    setAddPopupProps((prev) => ({ ...prev, visible: true, title: '완재료거래처 수정' }));
  }, []);

  return (
    <>
      <DataGrid
        dataSource={list}
        onToolbarPreparing={onToolbarPreparing}
        onRowDblClick={onRowDblClick}
        selection={{ mode: 'single' }}
        editing={{
          mode: 'cell',
          allowAdding: true,
        }}
        {...defaultDataGridProps}
        onEditorPreparing={onEditorPreparing}
      >
        <Column
          dataField="raw_id"
          caption="분류번호"
          alignment="left"
          width={100}
        />
        <Column
          dataField="rawknm"
          caption="원재료거래처명"
        />
        <Column
          dataField="rawrem"
          caption="메모"
        />
      </DataGrid>
      {
        addPopupProps.visible && (
          <RawMatAddPopup
            popupProps={addPopupProps}
            setPopupProps={setAddPopupProps}
          />
        )
      }
    </>
  );
};

export default MainGrid;
