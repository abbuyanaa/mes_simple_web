import Head from 'next/head';
import ResponsiveBox, { Col, Item, Location, Row } from 'devextreme-react/responsive-box';
import SearchForm from '../../components/basic/RawMat/SearchForm';
import MainGrid from '../../components/basic/RawMat/MainGrid';

const rawMat = () => {
  return (
    <>
      <Head>
        <title>원재료거래처정보</title>
      </Head>
      <ResponsiveBox width="100%" height="100%">
        <Row ratio={1} shrink={1} />
        <Row ratio={1} />
        <Col />
        <Item>
          <Location row={0} col={0} />
          <SearchForm />
        </Item>
        <Item>
          <Location row={1} col={0} />
          <MainGrid />
        </Item>
      </ResponsiveBox>
    </>
  );
};

export default rawMat;
