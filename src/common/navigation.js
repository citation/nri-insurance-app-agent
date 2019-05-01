import MenuIconInsurance from './image/menu/insurance.svg';
import MenuIconAccount from './image/menu/mypage.svg';
import MenuIconOptin from './image/menu/optin.svg';
import MenuIconDoctorScan from './image/menu/analysis.png';
import MenuIconFinancialPlanner from './image/menu/JOB-INTERVIEW.png'
import MenuIconStore from './image/menu/OFFICE-LIFE.png'



export const TOP_MENU = [
  {
    key: "CustomerList",
    title: "顧客一覧",
    image: MenuIconInsurance,
    url: "/customer/list"
  },
  // {
  //   key: "PolicyList",
  //   title: "加入保険一覧",
  //   image: MenuIconInsurance,
  //   url: "/policy/list"
  // },
  // {
  //   key: "HealthCheckResults",
  //   title: "健康診断結果",
  //   image: MenuIconOptin,
  //   url: "/healthcheck/detail"
  // },
  // {
  //   key: "Analyzation",
  //   title: "分析結果",
  //   image: MenuIconDoctorScan,
  //   url: "/analyzation"
  // },
];


export const HEADER_MENU = [
  // {
  //   key: "TOP",
  //   nav: [
  //     {
  //       key: "PolicyList",
  //       title: "加入保険一覧",
  //       url: "/policy/list"
  //     },
  //     {
  //       key: "Analyzation",
  //       title: "分析結果",
  //       url: "/analyzation"
  //     },
  //   ]
  // },
  // {
  //   key: "PolicyList",
  //   nav: [
  //     {
  //       key: "HealthCheckResults",
  //       title: "健康診断結果",
  //       image: MenuIconOptin,
  //       url: "/healthcheck/detail"
  //     },
  //     {
  //       key: "Analyzation",
  //       title: "分析結果",
  //       url: "/analyzation"
  //     },
  //   ]
  // },
  // {
  //   key: "HealthCheckResults",
  //   nav: [
  //     {
  //       key: "PolicyList",
  //       title: "加入保険一覧",
  //       url: "/policy/list"
  //     },
  //     {
  //       key: "Analyzation",
  //       title: "分析結果",
  //       url: "/analyzation"
  //     },
  //   ]
  // },
  // {
  //   key: "Analyzation",
  //   nav: [
  //     {
  //       key: "PolicyList",
  //       title: "加入保険一覧",
  //       url: "/policy/list"
  //     },
  //     {
  //       key: "HealthCheckResults",
  //       title: "健康診断結果",
  //       image: MenuIconOptin,
  //       url: "/healthcheck/detail"
  //     },
  //   ]
  // },
  // {
  //   key: "CustomerList",
  //   nav: [
  //     {
  //       key: "PolicyList",
  //       title: "加入保険一覧",
  //       url: "/policy/list"
  //     },
  //     {
  //       key: "Analyzation",
  //       title: "分析結果",
  //       url: "/analyzation"
  //     },
  //   ]
  // },
];

export const POLICY_MENU = [
  {
    key: "SCAN_MEDICAL_CERTIFICATE",
    title: "保険金請求（診断書スキャン）",
    sub_title: "診断書をスキャンします",
    icon: MenuIconInsurance,
    url: "/scan/medical_certificate"
  },
  {
    key: "CLAIM_OPTIN",
    title: "保険金請求（オプトイン）",
    sub_title: "診断結果を連携します",
    icon: MenuIconInsurance,
    url: "/medical_record/search"
  },
  // {
  //   key: "TRANSFER_WAY_EDIT",
  //   title: "お振込み方法の変更",
  //   sub_title: "保険金のお振込み方法を変更します",
  //   icon: MenuIconInsurance,
  //   url: "/transfer_way/menu"
  // },
  {
    key: "CHANGE_PAYMENT_WAY",
    title: "お支払い方法の変更",
    sub_title: "保険料のお支払い方法を変更します",
    icon: MenuIconInsurance,
    url: "/payment_way/menu"
  },
];

export const ACCOUNT_MENU = [
  {
    key: "ACCOUNT_EDIT",
    title: "アカウント情報",
    sub_title: "お客様の情報を変更します",
    icon: MenuIconInsurance,
    url: "/account/edit"
  },
  {
    key: "PASSWORD_EDIT",
    title: "パスワードの変更",
    sub_title: "パスワードを変更します",
    icon: MenuIconInsurance,
    url: "/now_development"
  },
  {
    key: "FACE_RECOGNITION_EDIT",
    title: "顔認証の再設定",
    sub_title: "顔認証を変更します",
    icon: MenuIconInsurance,
    url: "/now_development"
  },
];

export const FOOTER_NAVIGATION = [
  {
    title: "Main Menu",
    links: [
      {
        title: "Top Page",
        url: "/",
      },
      {
        title: "News",
        url: "/",
      },
    ],
  },
  {
    title: "Sub Menu",
    links: [
      {
        title: "Event",
        url: "/",
      },
      {
        title: "Campaon",
        url: "/",
      },
    ],
  },
  {
    title: "Extra Menu",
    links: [
      {
        title: "Service",
        url: "/",
      },
      {
        title: "Company",
        url: "/",
      },
    ],
  },
];


export const CONNECTION_MENU = [
  // {
  //   key: "PolicyList",
  //   title: "スカイプで相談する",
  //   description: "スカイプにてご相談内容を伺います",
  //   image: "data:image/jpeg;base64,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",
  //   url: "/now_development"
  // },
  // {
  //   key: "HealthCheckResults",
  //   title: "チャットで相談する",
  //   description: "チャットにてご相談内容を伺います",
  //   image: "data:image/jpeg;base64,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",
  //   url: "/now_development"
  // },
  {
    key: "Analyzation",
    title: "ファイナンシャルプランナーに相談する",
    description: "ファイナンシャルプランナーへの相談予約を行います",
    image: MenuIconFinancialPlanner,
    url: "/financialplanners/list"
  },
  {
    key: "AccountMenu",
    title: "代理店で相談する",
    description: "代理店情報をご案内します",
    image: MenuIconStore,
    url: "/now_development"
  },
];

export const PAYMENT_WAY_MENU = [
  {
    key: "0001",
    title: "ポイントでお支払い",
    sub_title: "保有するポイントでお支払いできます",
    image: "https://icon-pit.com/wp-content/uploads/2018/11/point_coin_icon_2564-300x300.png",
    url: "/payment/register/point"
  },
  {
    key: "0002",
    title: "クレジットカーとのご登録",
    sub_title: "お支払いに利用するクレジットカードのご登録ができます",
    image: "https://icon-pit.com/wp-content/uploads/2018/12/ic_credit-card_icon_3695-300x300.png",
    url: "/payment/register/credit_card"
  },
];
