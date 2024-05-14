export const MENU_ITEMS = [
  {
    key: 'apps',
    title: 'Apps',
    hasSub: true,
    linkTo: '/dashboard',
  },
  {
    key: 'topApps',
    title: 'Top Apps',
    hasSub: true,
    linkTo: '/top-new-apps',
  },
  {
    key: 'blogs',
    title: 'Blogs',
    linkTo: '/blogs',
  },
  {
    key: 'developers',
    title: 'Developers',
    linkTo: '/developers',
  },

  {
    key: 'watching-apps',
    title: 'Watching',
    linkTo: '/watching-apps',
  },
  {
    key: 'my-apps',
    title: 'My Apps',
    nameShow: 'My Apps',
    isShowPopupMyApp: true,
    isCheckAuth: true,
  },
];

export const MENU_APP_ITEM = [
  {
    key: 'categories',
    title: 'Categories',
    linkTo: '/categories',
  },
  {
    key: 'collections',
    title: 'Collections',
    linkTo: '/collections',
  },
  {
    key: 'new-apps',
    title: 'New Apps',
    linkTo: '/top-new-apps?page=1',
  },

  {
    key: 'delisted-deleted',
    title: 'Delisted or Deleted Apps',
    linkTo: '/delisted-deleted?page=1',
  },
  {
    key: 'built-for-shopify',
    title: 'Built For Shopify',
    linkTo: '/collection/built-for-shopify',
  },
  {
    key: 'integrations',
    title: 'Integrations Capabilities',
    linkTo: '/integrations',
  },
];

export const MENU_TOP_APP_ITEM = [
  {
    key: 'review',
    title: 'Review',
    linkTo: '/top-reviewed',
  },
  {
    key: 'growth_rate',
    title: 'Growth Rate',
    linkTo: '/growth_rate',
  },
  {
    key: 'installation_growth_rate',
    title: 'Installation Growth Rate',
    linkTo: '/installation_growth_rate',
  },
];
