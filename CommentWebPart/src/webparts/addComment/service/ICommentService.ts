import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ServiceScope } from '@microsoft/sp-core-library';
import { IComment } from '../model/IComment';

export interface ICommentService {
    addComment(context: IWebPartContext,
                serviceScope: ServiceScope,
                clientId: string,
                endpointUrl: string,
                comment: IComment):
        Promise<void | string>;
}