import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
// import { useTranslation } from 'next-i18next';
import { useCookies } from 'react-cookie';
import Form, { ButtonItem, GroupItem, SimpleItem, ColCountByScreen } from 'devextreme-react/form';
import Popup, { Position } from 'devextreme-react/popup';
import dxTextBox from 'devextreme/ui/text_box';

import { loginRequest } from '../../reducers/user';
import defaultFormProps from '../config/FormConfig';
import { getPasswordIcon } from '../../utils/util';

const ID_COOKIE = 'Twowin_SaveID';

const LoginForm = ({ setShowLoginForm }) => {
  // const { t } = useTranslation('common');
  const dispatch = useDispatch();
  const [cookies, setCookie, deleteCookie] = useCookies([ID_COOKIE]);
  const [pwOP, setPwOP] = useState('password');
  const formRef = useRef();
  const loginData = useMemo(() => ({
    id: cookies[ID_COOKIE] ? cookies[ID_COOKIE] : '',
    pw: '',
    rememberID: !!cookies[ID_COOKIE],
  }), []);
  const onLoginClick = useCallback(() => {
    // if (e.validationGroup.validate().isValid) {
    if (formRef.current.instance.validate().isValid) {
      dispatch(loginRequest(loginData));
      // 1주일 cookie 유지 - maxAge 기본단위 초 : 60(1분) * 60(1시간) * 24(1일) * 7 (1주일)
      if (loginData.rememberID) setCookie(ID_COOKIE, loginData.id, { maxAge: 60 * 60 * 24 * 7 });
      else deleteCookie(ID_COOKIE);
    }
  }, [formRef.current, loginData]);
  const onHiding = useCallback(() => setShowLoginForm(false), []);
  const onPopupShown = useCallback((e) => {
    const el = e.component.content().parentNode.querySelector('.tw-login-form-input-focus');
    if (el) {
      const instance = dxTextBox.getInstance(el);
      instance.focus();
    }
  }, []);
  const titleRender = useCallback(() => (<span className="tw-popup-title">{t('login-form.login-title')}</span>), []);
  return (
    <Popup
      className="tw-login-popup"
      visible
      onHiding={onHiding}
      onShown={onPopupShown}
      dragEnabled={false}
      hideOnOutsideClick
      showCloseButton={false}
      showTitle
      titleRender={titleRender}
      width="400px"
      height="auto"
      container=".dx-viewport"
    >
      <Position at="center" my="center" />
      <Form
        {...defaultFormProps}
        ref={formRef}
        formData={loginData}
        readOnly={false}
        validationGroup="loginData"
      >
        <ColCountByScreen xs={1} sm={1} md={1} lg={1} />
        <SimpleItem
          cssClass="tw-login-form-input"
          dataField="id"
          label={{ text: t('login-form.id.label') }}
          isRequired
          // validationRules={[
          //   { type: 'required' },
          //   { type: 'email', message: t('login-form.id.email-rule') },
          // ]}
          editorType="dxTextBox"
          editorOptions={{
            elementAttr: { class: 'tw-login-form-input-focus' },
          }}
        />
        <SimpleItem
          cssClass="tw-login-form-input"
          dataField="pw"
          editorOptions={{
            mode: pwOP,
            // placeholder: t('login-form.password.label'),
            onEnterKey: onLoginClick,
            buttons: [{
              location: 'after',
              name: 'pw',
              options: {
                icon: getPasswordIcon(pwOP),
                type: 'default',
                onClick: () => setPwOP((prev) => (prev === 'password' ? 'text' : 'password')),
                focusStateEnabled: false,
              },
            }],
          }}
          label={{ text: t('login-form.password.label') }}
          isRequired
        />
        <SimpleItem
          cssClass="tw-login-form-input"
          dataField="rememberID"
          label={{ visible: false }}
          editorType="dxCheckBox"
          editorOptions={{ text: t('login-form.remember-id.label') }}
        />
        <GroupItem>
          <ColCountByScreen xs={1} sm={2} md={2} lg={2} />
          <ButtonItem
            validationGroup="loginData"
            horizontalAlignment="center"
            buttonOptions={{
              text: t('login-form.login-button'),
              type: 'success',
              useSubmitBehavior: false,
              onClick: onLoginClick,
            }}
          />
          <ButtonItem
            horizontalAlignment="center"
            buttonOptions={{
              text: t('login-form.cancel-button'),
              type: 'danger',
              onClick: onHiding,
            }}
          />
        </GroupItem>
      </Form>
    </Popup>
  );
};

export default LoginForm;
