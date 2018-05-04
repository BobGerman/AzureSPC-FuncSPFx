import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ServiceScope } from '@microsoft/sp-core-library';
import { IComment } from '../model/IComment';
import { ICommentService } from './ICommentService';
import { AadHttpClient } from '@microsoft/sp-http';

interface ICommentServiceBody {
    siteId: string;
    comment: string;
    username: string;
}

export default class AadCommentService implements ICommentService {

    public addComment(context: IWebPartContext,
                      serviceScope: ServiceScope,
                      clientId: string,
                      endpointUrl: string,
                      comment: IComment) : Promise<void | string> {

        var aadClient : AadHttpClient =
            new AadHttpClient(serviceScope, clientId);

        var body: ICommentServiceBody = {
            "siteId": "bgtest18.sharepoint.com,e35205f3-2461-4083-8ba0-da6ef589a781,64aaa6bd-ecf3-4c9d-9a60-4f56cffed7b5",
            "comment": comment.text,
            "username": "Bob"
        };

        const headers: HeadersInit = new Headers();
        headers.append("Content-Type", "application/json");

        return new Promise<void | string> ((resolve, reject) => {

            aadClient.post(endpointUrl, AadHttpClient.configurations.v1, {
                headers: headers,
                body: JSON.stringify(body)
            })
            .then((response) => {
                resolve();
            })
            .catch((error) => {
                reject(error);
            });

        });
    }
}