import { IauthState } from "./auth/models";
import { IgroupState } from "./group/models";
import { ImodalState } from "./modal/models";
import { IquestionState } from "./question/models";

export interface RootState {
    auth: IauthState;
    group: IgroupState;
    modal: ImodalState;
    question: IquestionState;
};