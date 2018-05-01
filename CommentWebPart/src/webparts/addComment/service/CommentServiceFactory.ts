import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ServiceScope } from '@microsoft/sp-core-library';
import { IComment } from '../model/IComment';
import { ICommentService } from './ICommentService';
import MockCommentService from './MockCommentService';
import CommentService from './CommentService';

import { EnvironmentType } from '@microsoft/sp-core-library';

export class CommentServiceFactory {

    public static getCommentService(environmentType: EnvironmentType) {

        if (environmentType === EnvironmentType.Local) {
            return new MockCommentService();
        } else {
            return new CommentService();
        }
    }
}