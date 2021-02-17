import { IauthState } from "./auth/models";
import { ImodalState } from "./modal/models";

export interface RootState {
    auth: IauthState;
    modal: ImodalState;
};