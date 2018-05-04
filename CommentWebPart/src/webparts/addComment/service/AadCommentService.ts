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

        const temp: HTMLAnchorElement = document.createElement("a");
        temp.href = context.pageContext.web.absoluteUrl;

        const siteId = temp.hostname + "," +
                     context.pageContext.site.id + "," +
                     context.pageContext.web.id;

                     var aadClient : AadHttpClient =
            new AadHttpClient(serviceScope, clientId);

        const body: ICommentServiceBody = {
            "siteId": siteId,
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