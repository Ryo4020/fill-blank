export interface ImodalState {
    isOpening: boolean;
    path: string | null; // 閉じてる時はnull
}

export class ModalState implements ImodalState {
    isOpening = false; // モーダルが表示されたらtrue
    path = null; // 表示中のモーダルの名前
}