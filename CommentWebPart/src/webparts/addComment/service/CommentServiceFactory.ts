import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ServiceScope } from '@microsoft/sp-core-library';
import { IComment } from '../model/IComment';
import { ICommentService } from './ICommentService';
import MockCommentService from './MockCommentService';
import AadCommentService from './AadCommentService';

import { EnvironmentType } from '@microsoft/sp-core-library';

export class CommentServiceFactory {

    public static getCommentService(environmentType: EnvironmentType, isAad: boolean) {

        if (environmentType === EnvironmentType.Local) {
            return new MockCommentService();
        } else if (isAad) {
            return new AadCommentService();
        } else {
            return null;
        }
    }
}