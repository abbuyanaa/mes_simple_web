import React from 'react';
import DataGrid, { Column } from 'devextreme-react/data-grid';
import defaultDataGridProps from '../../config/DataGridConfig';

const MainGrid = () => {
  return (
    <DataGrid
      dataSource={null}
      {...defaultDataGridProps}
    >
      <Column dataField="col1" caption="분류번호" />
      <Column dataField="col2" caption="원재료거래처명" />
      <Column dataField="col3" caption="메모" />
    </DataGrid>
  );
};

export default MainGrid;
