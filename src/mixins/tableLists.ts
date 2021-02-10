export interface ItableContent {
    label: string;
    key: string;
    width: number;
}

export const HOME_TABLE_LIST: ItableContent[] = [
    {
        label: "名前",
        key: "name",
        width: 40,
    },
    {
        label: "問題数",
        key: "total",
        width: 20,
    },
];

export const EDIT_TABLE_LIST: ItableContent[] = [
    {
        label: "問題",
        key: "text",
        width: 55,
    },
    {
        label: "空白数",
        key: "total",
        width: 25,
    },
];

export interface ItableOperator {
    label: string;
    key: string;
    width: number;
}

export const HOME_TABLE_OPERATOR_LIST: ItableOperator[] = [
    {
        label: "開始",
        key: "exercise",
        width: 20,
    },
    {
        label: "編集",
        key: "edit",
        width: 10,
    },
    {
        label: "削除",
        key: "delete",
        width: 10,
    },
];

export const EDIT_TABLE_OPERATOR_LIST: ItableOperator[] = [
    {
        label: "編集",
        key: "edit",
        width: 10,
    },
    {
        label: "削除",
        key: "delete",
        width: 10,
    },
];