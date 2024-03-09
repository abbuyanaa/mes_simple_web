import React, { useCallback, useMemo } from 'react';
// import ResponsiveBox, { Col, Item, Location, Row } from 'devextreme-react/responsive-box';
import Form, { ButtonItem, SimpleItem } from 'devextreme-react/form';

const SearchForm = () => {
  const formRef = React.useRef();
  const formDataMemo = useMemo(() => ({
    matpnm: '',
  }), []);
  const onSearchBtnClick = useCallback(() => {
    if (formDataMemo.matpnm !== '') {
      alert(formDataMemo.matpnm);
    }
  }, [formDataMemo]);
  return (
    <Form
      ref={formRef}
      formData={formDataMemo}
      labelLocation="left"
      labelMode="floating"
      colCount={2}
      // colCountByScreen={{ xs: 2, sm: 2, }}
    >
      <SimpleItem
        colSpan={1}
        label={{ text: '원재료명' }}
        dataField="matpnm"
      />
      <ButtonItem
        colSpan={1}
        verticalAlignment="center"
        horizontalAlignment="center"
        buttonOptions={{
          text: '검색',
          type: 'normal',
          onClick: onSearchBtnClick,
        }}
      />
    </Form>
  );
  // return (
  //   <ResponsiveBox>
  //     <Row />
  //     <Col />
  //     <Item>
  //       <Location row={0} col={0} />
  //     </Item>
  //   </ResponsiveBox>
  // );
};

export default SearchForm;
