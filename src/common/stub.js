import uuid from '../utility/uuid';

export const NewsInformation = [{
    id: uuid.getUuid(),
    image: "https://www.nri.com/-/media/Corporate/jp/Images/journal/2018/12/1227_top.jpg",
    url: "/",
    title: "『ITナビゲーター2019年版』――2024年度までのトレンド予測",
  },
  {
    id: uuid.getUuid(),
    image: "https://www.nri.com/-/media/Corporate/jp/Images/journal/2018/03/0309_top.jpg",
    url: "/",
    title: "木内登英の経済の潮流――キャッシュレス化のメリットを考える",
  }
];

export const HealthCheckFields = {
  date: "2019-04-02",
  result: [{
      id: "1",
      name: "既往症",
      value: "なし",
      standard: "なし",
      opinion: "今のところは異常がない状態です。",
    },
    {
      id: "2",
      name: "自覚症状",
      value: "あり",
      standard: "なし",
      opinion: "わずかに基準値外ですが、日常生活には問題がなく、食事や生活上の制限は何もありません。心配ない状態です。",
    },
    {
      id: "3",
      name: "身長",
      value: "198cm",
      standard: "170cm",
      opinion: "わずかに基準値外ですが、日常生活には問題がなく、食事や生活上の制限は何もありません。心配ない状態です。",
    },
    {
      id: "4",
      name: "体重",
      value: "78kg",
      standard: "65cm",
      opinion: "今のところは異常がない状態です。",
    },
    {
      id: "5",
      name: "視力",
      value: "2.0",
      standard: "1.0",
      opinion: "今のところは異常がない状態です。",
    },
    {
      id: "6",
      name: "聴力",
      value: "XX",
      standard: "XX",
      opinion: "やや異常があります。異常の程度が現時点ではひどくありませんが、将来問題が生じる可能性が否定できない為、間隔をおいて検査をし、状態の変化をみる必要があります。（Ｄ1…1年後・Ｄ2…6ヶ月後）指摘された事柄について自分自身で意識を持って生活をし、改善するよう努力が必要です。すぐ受診の必要はありませんが、気になるようであれば、医師に相談して下さい。",
    },
    {
      id: "7",
      name: "腹囲",
      value: "XX",
      standard: "XX",
      opinion: "今のところは異常がない状態です。",
    },
    {
      id: "8",
      name: "BMI",
      value: "XX%",
      standard: "XX",
      opinion: "今のところは異常がない状態です。",
    },
    {
      id: "9",
      name: "胸部X線",
      value: "XX",
      standard: "XX",
      opinion: "今のところは異常がない状態です。",
    },
    {
      id: "10",
      name: "血圧",
      value: "XX",
      standard: "XX",
      opinion: "	問診上、治療中と記入された場合はこの判定になります。",
    },
    {
      id: "11",
      name: "尿検査",
      value: "XX",
      standard: "XX",
      opinion: "今のところは異常がない状態です。",
    },
    {
      id: "12",
      name: "貧血検査",
      value: "XX",
      standard: "XX",
      opinion: "今のところは異常がない状態です。",
    },
    {
      id: "13",
      name: "肝機能検査GOT",
      value: "XX",
      standard: "XX",
      opinion: "今のところは異常がない状態です。",
    },
    {
      id: "14",
      name: "GPT",
      value: "XX",
      standard: "XX",
      opinion: "検査の時点で、明らかに専門医の診察・治療が必要な状態であることを意味します。なるべく早く受診が必要です",
    },
    {
      id: "15",
      name: "γ-GTP",
      value: "XX",
      standard: "XX",
      opinion: "検査時の体調や検査の条件・及び検体量が検査に適していなかった為、きちんとした検査が出来なかった場合の判定です。近いうちに同じ検査を受けて、きちんとした判定を受けて下さい。",
    },
    {
      id: "16",
      name: "血中脂質検査LDL",
      value: "XX",
      standard: "XX",
      opinion: "今のところは異常がない状態です。",
    },
    {
      id: "17",
      name: "HDL",
      value: "XX",
      standard: "XX",
      opinion: "今のところは異常がない状態です。",
    },
    {
      id: "18",
      name: "心電図",
      value: "XX",
      standard: "XX",
      opinion: "今のところは異常がない状態です。",
    },
  ]
};


export const AnalyzationResult = {
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      yaxis: {
        show: false,
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: undefined,
        formatter: function (val, opts) {
          return val
        },
        textAnchor: 'middle',
        offsetX: 0,
        offsetY: 0,
        style: {
          fontSize: '8px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          colors: undefined
        },
        dropShadow: {
          enabled: false,
          top: 1,
          left: 1,
          blur: 1,
          opacity: 0.45
        }
      },
      markers: {
        size: 3,
        hover: {
          size: 10
        }
      },
      legend: {
        position: 'top'
      },
      fill: {
        colors: undefined,
        opacity: 0.9,
        type: 'solid',
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: '100%'
            },
            legend: {
              position: "top"
            }
          }
        },
        {
          breakpoint: 769,
          options: {
            chart: {
              width: '48%',
            },
             legend: {
              position: "bottom"
            }
          }
        },
        {
          breakpoint: 2048,
          options: {
            chart: {
              width: '48%',
            },
             legend: {
              position: "bottom"
            }
          }
        },
      ],

      
      colors: ['#607ec7', '#46c49c', '#f4b23f', '#ca85ca', '#61c436', '#cf4d35'],
      labels: ['死亡保険', '医療保険', '介護保険', 'がん保険', '年金保険', '就業不能保険'],
    },
  series: [
    {
      name: '同年齢層の加入平均',
      data: [50, 80, 40, 80, 10, 20],
    },
    {
    name: '保険 太郎様の加入状況',
    data: [30, 70, 30, 30, 10, 20],
    }
  ]
};


export const HealthAnalyzation = {
  options: {
    chart: {
      toolbar: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: undefined,
      formatter: function (val, opts) {
        return val
      },
      textAnchor: 'middle',
      offsetX: 0,
      offsetY: 0,
      style: {
        fontSize: '8px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        colors: undefined
      },
      dropShadow: {
        enabled: false,
        top: 1,
        left: 1,
        blur: 1,
        opacity: 0.45
      }
    },
    markers: {
      size: 3,
      hover: {
        size: 10
      }
    },
    legend: {
      position: 'top'
    },
    fill: {
      colors: undefined,
      opacity: 0.9,
      type: 'solid',
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: '100%'
          },
          legend: {
            position: "top"
          }
        }
      },
      {
        breakpoint: 769,
        options: {
          chart: {
            width: '48%',
          },
           legend: {
            position: "bottom"
          }
        }
      },
      {
        breakpoint: 2048,
        options: {
          chart: {
            width: '48%',
          },
           legend: {
            position: "bottom"
          }
        }
      },
    ],
    colors: ['#607ec7', '#46c49c', '#f4b23f', '#ca85ca', '#61c436', '#cf4d35'],
    labels: ['BMI', '心電図', '血圧', '肝機能', '脂質', 'HDL'],
  },
  series: [{
    name: '同年齢層の平均値',
    data: [35, 40, 40, 50, 20, 30],
  },
  {
    name: '保険 太郎様の診断結果',
    data: [30, 40, 70, 10, 15, 30],
  }
]
};

export const FinancialPlanners = [
  {
    id: "00001",
    name: "戸松 優子",
    image: "data:image/jpeg;base64,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",
    profile: "保険代理店にて約5年間個別の生命保険コンサルティング業務に従事。お客様が豊かな人生を送るには、生命保険のアドバイスだけでなくお客様のライフプラン全般のアドバイスが必要との思いからAFP資格を取得する。現在、トータル的なファイナンシャルのアドバイスをしている独立系ＦＰ事務所おかねの相談室に所属。住宅購入資金相談を中心に生命保険見直し相談、資産運用相談などお金に関わる全般的な相談をお客様の立場に立って解決できるように活動中。",
    certifications: [
      "AFP（日本FP協会認定）",
      "2級FP技能士（国家資格）",
      "第1種証券外務員（日本証券業協会認定）"
    ],
  },
  {
    id: "00002",
    name: "倉重 義孝",
    image: "data:image/jpeg;base64,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",
    profile: "保険代理店にて約5年間個別の生命保険コンサルティング業務に従事。お客様が豊かな人生を送るには、生命保険のアドバイスだけでなくお客様のライフプラン全般のアドバイスが必要との思いからAFP資格を取得する。現在、トータル的なファイナンシャルのアドバイスをしている独立系ＦＰ事務所おかねの相談室に所属。住宅購入資金相談を中心に生命保険見直し相談、資産運用相談などお金に関わる全般的な相談をお客様の立場に立って解決できるように活動中。",
    certifications: [
      "AFP（日本FP協会認定）",
      "2級FP技能士（国家資格）",
      "第1種証券外務員（日本証券業協会認定）"
    ],
  },
  {
    id: "00003",
    name: "小沢 雅人",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDb_JCqVjQjxPPVNTqC6F1DYIawtrjpafKHuimL3-rOliLeJ8tkA",
    profile: "保険代理店にて約5年間個別の生命保険コンサルティング業務に従事。お客様が豊かな人生を送るには、生命保険のアドバイスだけでなくお客様のライフプラン全般のアドバイスが必要との思いからAFP資格を取得する。現在、トータル的なファイナンシャルのアドバイスをしている独立系ＦＰ事務所おかねの相談室に所属。住宅購入資金相談を中心に生命保険見直し相談、資産運用相談などお金に関わる全般的な相談をお客様の立場に立って解決できるように活動中。",
    certifications: [
      "AFP（日本FP協会認定）",
      "2級FP技能士（国家資格）",
      "第1種証券外務員（日本証券業協会認定）"
    ],
  },
]

export const Account_Information = {
  id: "1234567890",
  base: {
    name: "保険 太郎",
    birthday: "1982/02/13",
    gender: "male",
    phone_number: "09012345678",
    email: "taro@nri.com",
  },
  address: {
    countory: "Japan",
    postal_code: "1239876",
    state: "13",
    city: "港区",
    address1: "海岸1-2",
    address2: "アーツ芝浦1002",
  }
}



export const CustomerList = [
  {
    registed_date:  "2019/01/25",
    updated_date: "2019/03/25",
    id: "0001",
    name: "田中　一郎",
    age: 37,
    birthday: "1982/02/13",
    gender: "男性",
    phone_number: "01230001111",
    email: "abc@a.com",
    address: {
      postal_code: "1239876",
      state: "東京",
      city: "港区",
      address1: "海岸1-2",
      address2: "アーツ芝浦1002",
    },
    policy: [
      {
        insurer: "アフラック",
        item_name: "死亡保険アフラック",
        image: "https://bloximages.newyork1.vip.townnews.com/insideradio.com/content/tncms/assets/v3/editorial/7/31/7315209c-8ff7-11e6-84e7-f7d77203b2b2/57fd55d7a012c.image.jpg",
        category: "死亡保険",
        term: "2018/04/01 - 2019/03/31",
        payment: "一括",
      },
      {
        insurer: "アフラック",
        item_name: "医療保険アフラック",
        image: "https://bloximages.newyork1.vip.townnews.com/insideradio.com/content/tncms/assets/v3/editorial/7/31/7315209c-8ff7-11e6-84e7-f7d77203b2b2/57fd55d7a012c.image.jpg",
        category: "医療保険",
        term: "2018/04/01 - 2019/03/31",
        payment: "年次",
      },
      {
        insurer: "かんぽ生命",
        item_name: "年金保険かんぽ",
        image: "https://dcdn.cdn.nimg.jp/niconews/articles/images/434344/330214l.jpg",
        category: "年金保険",
        term: "2018/04/01 - 2019/03/31",
        payment: "年次",
      }
    ],
    family: [
      {
        type: "妻",
        birthday: "1982/11/27",
        name: "田中 花子",
        age: 36,
      },
      {
        type: "長男",
        birthday: "2016/09/15",
        name: "田中 小太郎",
        age: 3,
      },
      {
        type: "長女",
        birthday: "2011/07/18",
        name: "田中 小太郎",
        age: 7,
      }
    ],
    connection: [
      {
        request_date: "2019/02/01",
        date: "2019/04/01",
        time: "10:00",
        state: "取消"
      },
      {
        request_date: "2019/02/01",
        date: "2019/04/02",
        time: "10:00",
        state: "申請中"
      }
    ]
  },
  {
    registed_date:  "2019/01/25",
    updated_date: "2019/03/25",
    id: "0002",
    name: "鈴木　花子",
    age: 27,
    birthday: "1992/06/13",
    gender: "女性",
    phone_number: "01230002222",
    email: "xyz@a.com",
    address: {
      postal_code: "3339876",
      state: "東京",
      city: "港区",
      address1: "六本木1-2",
      address2: "アーツ芝浦1002",
    },
    policy: [
      {
        insurer: "日本生命",
        item_name: "医療保険ニッセイ",
        image: "https://static.clarity.tokyo/images/companies-logo/companylogo_91.png",
        category: "医療保険",
        term: "2018/04/01 - 2019/03/31",
        payment: "月次",
      },
      {
        insurer: "第一生命",
        item_name: "がん保険ダイイチ",
        image: "https://pbs.twimg.com/profile_images/889402323742490628/R2jM-6jR_400x400.jpg",
        category: "がん保険",
        term: "2018/04/01 - 2019/03/31",
        payment: "月次",
      }
    ],
  },
  {
    registed_date:  "2019/01/25",
    updated_date: "2019/03/25",
    id: "0003",
    name: "小林　はじめ",
    age: 67,
    birthday: "1952/03/13",
    gender: "男性",
    phone_number: "01230002222",
    email: "xyz@a.com",
    address: {
      postal_code: "3339876",
      state: "東京",
      city: "港区",
      address1: "赤坂1-2",
      address2: "アーツ芝浦1002",
    },
    policy: [
      {
        insurer: "かんぽ生命",
        item_name: "介護保険かんぽ",
        image: "https://dcdn.cdn.nimg.jp/niconews/articles/images/434344/330214l.jpg",
        category: "介護保険",
        term: "2018/04/01 - 2019/03/31",
        payment: "月次",
      },
      {
        insurer: "第一生命",
        item_name: "医療保険ダイイチ",
        image: "https://pbs.twimg.com/profile_images/889402323742490628/R2jM-6jR_400x400.jpg",
        category: "医療保険",
        term: "2018/04/01 - 2019/03/31",
        payment: "月次",
      }
    ],
    family: [
      {
        type: "妻",
        birthday: "1982/12/12",
        name: "小林 フィン",
        age: 36,
      },
    ]
  },
  {
    registed_date:  "2019/01/25",
    updated_date: "2019/03/25",
    id: "0004",
    name: "山田　太一",
    age: 19,
    birthday: "2000/01/03",
    gender: "男性",
    phone_number: "01230009999",
    email: "aws@a.com",
    address: {
      postal_code: "3339876",
      state: "東京",
      city: "港区",
      address1: "品川1-2",
      address2: "アーツ芝浦1002",
    },
    policy: [
      {
        insurer: "かんぽ生命",
        item_name: "年金保険かんぽ",
        image: "https://dcdn.cdn.nimg.jp/niconews/articles/images/434344/330214l.jpg",
        category: "年金保険",
        term: "2018/04/01 - 2019/03/31",
        payment: "月次",
      },
      {
        insurer: "第一生命",
        item_name: "死亡保険ダイイチ",
        image: "https://pbs.twimg.com/profile_images/889402323742490628/R2jM-6jR_400x400.jpg",
        category: "死亡保険",
        term: "2018/04/01 - 2019/03/31",
        payment: "月次",
      },
      {
        insurer: "日本生命",
        item_name: "医療保険ニッセイ",
        image: "https://static.clarity.tokyo/images/companies-logo/companylogo_91.png",
        category: "医療保険",
        term: "2018/04/01 - 2019/03/31",
        payment: "月次",
      },
      {
        insurer: "アフラック",
        item_name: "就業不能保険アフラック",
        image: "https://bloximages.newyork1.vip.townnews.com/insideradio.com/content/tncms/assets/v3/editorial/7/31/7315209c-8ff7-11e6-84e7-f7d77203b2b2/57fd55d7a012c.image.jpg",
        category: "就業不能保険",
        term: "2018/04/01 - 2019/03/31",
        payment: "月次",
      },
    ],
    family: [
      {
        type: "妻",
        birthday: "2001/12/12",
        name: "山田 細",
        age: 18,
      },
      {
        type: "長男",
        birthday: "2003/12/12",
        name: "山田 太",
        age: 1,
      },
    ],
    connection: [
      {
        request_date: "2018/12/24",
        date: "2018/12/25",
        time: "10:00",
        state: "取消"
      },
      {
        request_date: "2019/02/01",
        date: "2019/03/18",
        time: "10:00",
        state: "完了"
      },
      {
        request_date: "2019/03/18",
        date: "2019/04/25",
        time: "10:00",
        state: "申請中"
      }
    ]
  },
]

export const DoctorsForMedicalRecords = [{
  id: "00001",
  hospital: "亀田総合病院",
  department: "循環器内科",
  position: "主任部長",
  doctor: "八重樫 牧人",
  image: "data:image/jpeg;base64,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",
},
{
  id: "00002",
  hospital: "亀田総合病院",
  department: "外科",
  position: "",
  doctor: "清水 幸子",
  image: "data:image/jpeg;base64,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",
},
{
  id: "00003",
  hospital: "亀田総合病院",
  department: "内科",
  position: "",
  doctor: "佐藤 暁幸",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDb_JCqVjQjxPPVNTqC6F1DYIawtrjpafKHuimL3-rOliLeJ8tkA",
}
]

export const Policies = [{
  "id": "0001",
  "insurancer": "第一生命",
  "item_name": "ジャスト しあわせせ物語",
  "description": "老後や教育など将来のための資金を計画的に準備できる個人年金保険です",
  "image": "https://pbs.twimg.com/profile_images/889402323742490628/R2jM-6jR_400x400.jpg",
  "contract": {
    "policy_number": "1234-5678-0001",
    "policy_holders": "保険者 太郎",
    "insuranced": {
      "name": "田中 一郎",
      "birthday": "1982/02/13",
      "contract_age": "36"
    },
    "beneficiary": "田中 花子",
    "contract_date": "2019/02/20",
    "period": "終身",
    "payment_period": "2040/03/20",
    "payment_way": "月払い"
  }
},
{
  "id": "0002",
  "insurancer": "かんぽ生命",
  "item_name": "終身保険　新ながいきくん（定額型）",
  "description": "保障が一生涯続き家族も安心、特約でケガや病気への備えも！ 月々の保険料を抑えたプランも選べます",
  "image": "https://dcdn.cdn.nimg.jp/niconews/articles/images/434344/330214l.jpg",
  "contract": {
    "policy_number": "1234-5678-0001",
    "policy_holders": "保険者 太郎",
    "insuranced": {
      "name": "田中 一郎",
      "birthday": "1982/02/13",
      "contract_age": "36"
    },
    "beneficiary": "田中 花子",
    "contract_date": "2019/02/20",
    "period": "終身",
    "payment_period": "2040/03/20",
    "payment_way": "月払い"
  }
},
{
  "id": "0003",
  "insurancer": "アフラック",
  "item_name": "ちゃんと応える医療保険 EVER",
  "description": "ライフステージの変化にちゃんと応える医療保険ＥＶＥＲ",
  "image": "https://yt3.ggpht.com/a-/AAuE7mBnxBDPNMvl53iWuieLgFro75_Rlm_NTbg4CQ=s900-mo-c-c0xffffffff-rj-k-no",
  "badge": "SCAN_MEDICAL_CERTIFICATE",
  "contract": {
    "policy_number": "1234-5678-0001",
    "policy_holders": "保険者 太郎",
    "insuranced": {
      "name": "田中 一郎",
      "birthday": "1982/02/13",
      "contract_age": "36"
    },
    "beneficiary": "田中 花子",
    "contract_date": "2019/02/20",
    "period": "終身",
    "payment_period": "2040/03/20",
    "payment_way": "月払い"
  }
},
{
  "id": "0004",
  "insurancer": "アフラック",
  "item_name": "生きるためのがん保険",
  "description": "がん治療の主流である三大治療を保障します",
  "image": "https://yt3.ggpht.com/a-/AAuE7mBnxBDPNMvl53iWuieLgFro75_Rlm_NTbg4CQ=s900-mo-c-c0xffffffff-rj-k-no",
  "contract": {
    "policy_number": "1234-5678-0001",
    "policy_holders": "保険者 太郎",
    "insuranced": {
      "name": "田中 一郎",
      "birthday": "1982/02/13",
      "contract_age": "36"
    },
    "beneficiary": "田中 花子",
    "contract_date": "2019/02/20",
    "period": "終身",
    "payment_period": "2040/03/20",
    "payment_way": "月払い"
  }
},
{
  "id": "0005",
  "insurancer": "アフラック",
  "item_name": "スーパー介護年金プラン Vタイプ",
  "description": "スーパー介護年金プラン Vタイプ",
  "image": "https://yt3.ggpht.com/a-/AAuE7mBnxBDPNMvl53iWuieLgFro75_Rlm_NTbg4CQ=s900-mo-c-c0xffffffff-rj-k-no",
  "badge": "CHANGE_PAYMENT_WAY",
  "contract": {
    "policy_number": "1234-5678-0001",
    "policy_holders": "保険者 太郎",
    "insuranced": {
      "name": "田中 一郎",
      "birthday": "1982/02/13",
      "contract_age": "36"
    },
    "beneficiary": "田中 花子",
    "contract_date": "2019/02/20",
    "period": "終身",
    "payment_period": "2040/03/20",
    "payment_way": "月払い"
  }
}
]