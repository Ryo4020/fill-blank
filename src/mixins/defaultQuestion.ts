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
        name: "test-group1",
        total: 2,
    },
    {
        id: 2,
        name: "test-group2",
        total: 3,
    }
];

export const DEFAULT_QUESTION_LIST: IquestionData[][] = [ // 最初に設定される問題リスト
    [
        {
            id: 1,
            text: "sampleQ1a",
            total: 2,
        },
        {
            id: 2,
            text: "sampleQ1b",
            total: 3,
        },
    ],
    [
        {
            id: 1,
            text: "sampleQ2a",
            total: 2,
        },
        {
            id: 2,
            text: "sampleQ2b",
            total: 3,
        },
        {
            id: 3,
            text: "sampleQ2c",
            total: 1,
        }
    ]
];