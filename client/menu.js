const menus = {
  'ko-KR': [
    {
      menuID: '0',
      mainName: '홈',
      icon: 'home',
      addr: '/',
    },
    {
      menuID: '1',
      mainName: '기초정보',
      // icon: '',
      login: false,
      subMenus: [
        {
          menuID: '1-2',
          name: '원재료거리처정보',
          addr: '/bas/rawMat',
        },
        {
          menuID: '1-3',
          name: '원재료거리처',
          addr: '/bas/mat',
        },
      ],
    },
  ],
};

export default menus;
