export interface IgroupData {
    id: number;
    name: string;
    total: number;
}

export interface IquestionData {
    id: number;
    text: string;
    total: number;
}

export const DEFAULT_GROUP_LIST: IgroupData[] = [ // 最初に設定される問題グループの配列データ
    {
        id: 1,
        name: "英語（サンプル）",
        total: 2,
    },
    {
        id: 2,
        name: "日本史（サンプル）",
        total: 3,
    }
];

export const DEFAULT_QUESTION_LIST: IquestionData[][] = [ // 最初に設定される問題リスト
    [
        {
            id: 1,
            text: "今の英語は｜now｜だ。",
            total: 1,
        },
        {
            id: 2,
            text: "日本語でthisは｜これ｜、thatは｜あれ｜。",
            total: 2,
        },
    ],
    [
        {
            id: 1,
            text: "西暦｜1603｜年に｜徳川家康｜が江戸幕府を開いた。",
            total: 2,
        },
        {
            id: 2,
            text: "｜弥生｜時代に、｜邪馬台国｜の女王｜卑弥呼｜が呪術で国を治めた。",
            total: 3,
        },
        {
            id: 3,
            text: "『たけくらべ』の作者は｜樋口一葉｜。",
            total: 1,
        }
    ]
];