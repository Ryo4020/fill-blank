export interface IgroupData {
    id: number;
    name: string;
    value: IquestionData[];
    total: number;
}

export interface IquestionData {
    id: number;
    text: string;
    total: number;
}

export const DEFAULT_QUESTION_LIST: IgroupData[] = [ // 最初に設定される問題グループの配列データ
    {
        id: 1,
        name: "test1",
        value: [
            {
                id: 1,
                text: "sample1",
                total: 2,
            },
            {
                id: 2,
                text: "sample2",
                total: 3,
            },
        ],
        total: 2,
    },
    {
        id: 2,
        name: "test2",
        value: [
            {
                id: 1,
                text: "sample1",
                total: 2,
            },
            {
                id: 2,
                text: "sample2",
                total: 3,
            },
            {
                id: 3,
                text: "sample3",
                total: 1,
            }
        ],
        total: 3,
    }
];