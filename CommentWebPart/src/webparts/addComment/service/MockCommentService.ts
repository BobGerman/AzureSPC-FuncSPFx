import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ServiceScope } from '@microsoft/sp-core-library';
import { IComment } from '../model/IComment';
import { ICommentService } from './ICommentService';

export default class MockCommentService implements ICommentService {

    public addComment(context: IWebPartContext,
                      serviceScope: ServiceScope,
                      clientId: string,
                      endpointUrl: string,
                      comment: IComment) : Promise<void | string> {

        return new Promise<void> ((resolve) => {
            alert(`Mock service adding comment ${comment.text}`);
            resolve();
        });
    }
}