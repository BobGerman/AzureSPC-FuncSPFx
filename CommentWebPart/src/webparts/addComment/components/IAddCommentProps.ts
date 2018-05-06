import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ServiceScope } from '@microsoft/sp-core-library';
import { ICommentService } from '../service/ICommentService';

export interface IAddCommentProps {
    context: IWebPartContext;
    serviceScope: ServiceScope;
    commentService: ICommentService;
    title: string;
    description: string;
    caption: string;
    clientId: string;
    endpointUrl: string;
  }
  