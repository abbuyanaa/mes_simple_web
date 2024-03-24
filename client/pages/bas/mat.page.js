import Head from 'next/head';
import ResponsiveBox, { Col, Item, Location, Row } from 'devextreme-react/responsive-box';
import SearchForm from '../../components/bas/Mat/SearchForm';
import MainGrid from '../../components/bas/Mat/MainGrid';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { axiosAPI } from '../../api';
import { END } from 'redux-saga';
import wrapper from '../../store/configureStore';
import { rawMatListRequest } from '../../reducers/bas/rawMat';
import { matListRequest } from '../../reducers/bas/mat';

const Material = () => {
  return (
    <>
      <Head>
        <title>원재료거래처정보</title>
      </Head>
      <ResponsiveBox width="100%" height="100%">
        <Row ratio={1} baseSize={100} />
        <Row ratio={5} />
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

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const cookie = context.req?.headers.cookie || '';
  if (cookie) axiosAPI.defaults.headers.Cookie = cookie;
  const locale = context.locale || 'ko-KR';
  axiosAPI.defaults.headers.common['Accept-Language'] = locale;
  // store.dispatch(loadUserRequest());
  store.dispatch(matListRequest());
  store.dispatch(rawMatListRequest());
  store.dispatch(END);
  await store.sagaTask.toPromise();
  axiosAPI.defaults.headers.Cookie = '';
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
});

export default Material;
