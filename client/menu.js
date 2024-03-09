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
      mainName: '기준정보',
      // icon: '',
      login: false,
      subMenus: [
        {
          menuID: '1-2',
          name: '원재료거리처정보',
          addr: '/basic/rawMaterial',
        },
        {
          menuID: '1-3',
          name: '원재료거리처',
          addr: '/basic/material',
        },
      ],
    },
    // {
    //   menuID: '2',
    //   mainName: '생산관리',
    //   // icon: '',
    //   login: false,
    //   subMenus: [
    //     {
    //       menuID: '1_1',
    //       name: '',
    //       addr: '/',
    //     },
    //   ],
    // },
  ],
};

export default menus;
