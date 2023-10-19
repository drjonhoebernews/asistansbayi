export const routes = {
  // Kullanıcılar
  bayi: {
    dashboard: '/bayi',
    bayiList: '/bayi/acente',
    createBayi: '/bayi/acente/create',
    editBayi: (id:string)=>`/bayi/acente/${id}/edit`,
    BayiDetails: (id:string)=>`/bayi/acente/${id}`,
  },
  alt_bayi: {
    dashboard: '/alt_bayi',
    alt_bayiList: '/alt_bayi/acente',
    createAlt_bayi: '/alt_bayi/acente/create',
    editAlt_bayi: (id:string)=>`/alt_bayi/acente/${id}/edit`,
    alt_bayiDetails: (id:string)=>`/alt_bayi/acente/${id}`,
  },
  cekici: {
    dashboard: '/cekici',
    cekiciList: '/cekici/cekici',
    createCekici: '/cekici/cekici/create',
    editCekici: (id:string)=>`/cekici/cekici/${id}/edit`,
    cekiciDetails: (id:string)=>`/cekici/cekici/${id}`,
  },
  tamirci: {
    dashboard: '/tamirci',
    tamirciList: '/tamirci/tamirci',
    createTamirci: '/tamirci/tamirci/create',
    editTamirci: (id:string)=>`/tamirci/tamirci/${id}/edit`,
    tamirciDetails: (id:string)=>`/tamirci/tamirci/${id}`,
  },
  musteri: {
    dashboard: '/musteri',
    musteriList: '/musteri/musteri',
    createMusteri: '/musteri/musteri/create',
    editMusteri: (id:string)=>`/musteri/musteri/${id}/edit`,
    musteriDetails: (id:string)=>`/musteri/musteri/${id}`,
  },

  araclarMarka: {
    araclarMarkaList: '/marka/araclar',
  },
  araclarModel: {
    araclarModelList: '/model/araclar',
  },

  iller: {
    illerList: '/sehiril/iller',
  },
  ilceler: {
    ilcelerList: '/sehirilce/ilceler',
  },

  policeozellik: {
    ozellikList: '/policeoz/ozellikler',
  },
  policetur: {
    turList: '/policetur/turler',
  },

  police:{
    policeList: '/policeler/police',
    createPolice: '/policeler/police/create',
    editPolice: (id:string)=> `/policeler/police/${id}/edit`,
    policeDetails: (id:string)=> `/policeler/police/${id}`,
  },

  destektalep:{
    destektalepList: '/destek/talepler',
  },

  satislar:{
    satisList: '/satislar/satis',
    createSatis: '/satislar/satis/create',
    editSatis: (id:string)=> `/satislar/satis/${id}/edit`,
    satisDetails: (id:string)=> `/satislar/satis/${id}`,
  },



  // geliştirici alanı
  eCommerce: {
    dashboard: '/ecommerce',
    products: '/ecommerce/products',
    createProduct: '/ecommerce/products/create',
    productDetails: (id: string) => `/ecommerce/products/${id}`,
    ediProduct: (id: string) => `/ecommerce/products/${id}/edit`,
    categories: '/ecommerce/categories',
    createCategory: '/ecommerce/categories/create',
    editCategory: (id: string) => `/ecommerce/categories/${id}/edit`,
    orders: '/ecommerce/orders',
    createOrder: '/ecommerce/orders/create',
    orderDetails: (id: string) => `/ecommerce/orders/${id}`,
    editOrder: (id: string) => `/ecommerce/orders/${id}/edit`,
    reviews: '/ecommerce/reviews',
    shop: '/ecommerce/shop',
    cart: '/ecommerce/cart',
    checkout: '/ecommerce/checkout',
    trackingId: (id: string) => `/ecommerce/tracking/${id}`,
  },
  support: {
    dashboard: '/support',
    inbox: '/support/inbox',
    supportCategory: (category: string) => `/support/inbox/${category}`,
    messageDetails: (id: string) => `/support/inbox/${id}`,
    snippets: '/support/snippets',
    createSnippet: '/support/snippets/create',
    viewSnippet: (id: string) => `/support/snippets/${id}`,
    editSnippet: (id: string) => `/support/snippets/${id}/edit`,
    templates: '/support/templates',
    createTemplate: '/support/templates/create',
    viewTemplate: (id: string) => `/support/templates/${id}`,
    editTemplate: (id: string) => `/support/templates/${id}/edit`,
  },
  logistics: {
    dashboard: '/logistics',
    shipmentList: '/logistics/acenteler',
    customerProfile: '/logistics/customer-profile',
    createShipment: '/logistics/acenteler/create',
    editShipment: (id:string)=>`/logistics/acenteler/${id}/edit`,
    shipmentDetails: (id:string)=>`/logistics/acenteler/${id}`,
    tracking: (id: string) => `/logistics/tracking/${id}`,
  },
  analytics: '/analytics',
  file: {
    dashboard: '/file',
    manager: '/file-manager',
    upload: '/file-manager/upload',
    create: '/file-manager/create',
  },
  invoice: {
    home: '/invoice',
    create: '/invoice/create',
    details: (id: string) => `/invoice/${id}`,
    edit: (id: string) => `/invoice/${id}/edit`,
  },
  widgets: {
    cards: '/widgets/cards',
    icons: '/widgets/icons',
    charts: '/widgets/charts',
    maps: '/widgets/maps',
    banners: '/widgets/banners',
  },
  tables: {
    basic: '/tables/basic',
    collapsible: '/tables/collapsible',
    enhanced: '/tables/enhanced',
    pagination: '/tables/pagination',
    search: '/tables/search',
    stickyHeader: '/tables/sticky-header',
  },
  multiStep: '/multi-step',
  forms: {
    profileSettings: '/forms/profile-settings',
    notificationPreference: '/forms/profile-settings/notification',
    personalInformation: '/forms/profile-settings/profile',
    newsletter: '/forms/newsletter',
  },
  search: {
    realEstate: '/search/real-estate',
  },
  profile: '/profile',
  welcome: '/welcome',
  comingSoon: '/coming-soon',
  accessDenied: '/access-denied',
  notFound: '/not-found',
  maintenance: '/maintenance',
  blank: '/blank',
  auth: {
    signUp1: '/auth/sign-up-1',
    signUp2: '/auth/sign-up-2',
    signUp3: '/auth/sign-up-3',
    signUp4: '/auth/sign-up-4',
    signUp5: '/auth/sign-up-5',
    // sign in
    signIn1: '/auth/sign-in-1',
    signIn2: '/auth/sign-in-2',
    signIn3: '/auth/sign-in-3',
    signIn4: '/auth/sign-in-4',
    signIn5: '/auth/sign-in-5',
    // forgot password
    forgotPassword1: '/auth/forgot-password-1',
    forgotPassword2: '/auth/forgot-password-2',
    forgotPassword3: '/auth/forgot-password-3',
    forgotPassword4: '/auth/forgot-password-4',
    forgotPassword5: '/auth/forgot-password-5',
    // OTP
    otp1: '/auth/otp-1',
    otp2: '/auth/otp-2',
    otp3: '/auth/otp-3',
    otp4: '/auth/otp-4',
    otp5: '/auth/otp-5',
  },
  signIn: '/signin',
};
