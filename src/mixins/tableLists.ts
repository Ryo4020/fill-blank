export interface ItableContent {
    label: string;
    key: string;
    width: number;
}

export const HOME_TABLE_LIST: ItableContent[] = [ // ホーム画面の表の構成データ
    {
        label: "名前",
        key: "name",
        width: 40,
    },
    {
        label: "問題数",
        key: "total",
        width: 12,
    },
];

export const EDIT_TABLE_LIST: ItableContent[] = [ // 編集画面の表の構成データ
    {
        label: "問題",
        key: "text",
        width: 55,
    },
    {
        label: "空白数",
        key: "total",
        width: 15,
    },
];

export interface ItableOperator {
    label: string;
    key: string;
    width: number;
}

export const HOME_TABLE_OPERATOR_LIST: ItableOperator[] = [ // ホーム画面の表のボタンの構成データ
    {
        label: "開始",
        key: "exercise",
        width: 20,
    },
    {
        label: "編集",
        key: "edit",
        width: 14,
    },
    {
        label: "削除",
        key: "delete",
        width: 14,
    },
];

export const EDIT_TABLE_OPERATOR_LIST: ItableOperator[] = [ // 編集画面の表のボタンの構成データ
    {
        label: "編集",
        key: "edit",
        width: 15,
    },
    {
        label: "削除",
        key: "delete",
        width: 15,
    },
];