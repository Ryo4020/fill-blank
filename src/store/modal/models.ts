export interface ImodalState {
    isOpening: boolean;
    path: string | null; // 閉じてる時はnull
}

export class ModalState implements ImodalState {
    isOpening = true; // モーダルが表示されたらtrue
    path = "LogInForm"; // 表示中のモーダルの名前
}