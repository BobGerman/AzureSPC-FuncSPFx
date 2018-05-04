import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ServiceScope } from '@microsoft/sp-core-library';
import { IComment } from '../model/IComment';
import { ICommentService } from './ICommentService';
import { AadHttpClient } from '@microsoft/sp-http';

interface ICommentServiceBody {
    siteId: string;
    comment: string;
}

export default class AadCommentService implements ICommentService {

    public addComment(context: IWebPartContext,
                      serviceScope: ServiceScope,
                      clientOrFunctionId: string,
                      endpointUrl: string,
                      comment: IComment) : Promise<void | string> {

        const temp: HTMLAnchorElement = document.createElement("a");
        temp.href = context.pageContext.web.absoluteUrl;

        const siteId = temp.hostname + "," +
                     context.pageContext.site.id + "," +
                     context.pageContext.web.id;

                     var aadClient : AadHttpClient =
            new AadHttpClient(serviceScope, clientOrFunctionId);

        const body: ICommentServiceBody = {
            "siteId": siteId,
            "comment": comment.text
        };

        const headers: HeadersInit = new Headers();
        headers.append("Content-Type", "application/json");

        return new Promise<void | string> ((resolve, reject) => {

            aadClient.post(endpointUrl, AadHttpClient.configurations.v1, {
                headers: headers,
                body: JSON.stringify(body)
            })
            .then((response) => {
                if (response.status == 200) {
                    resolve();
                } else {
                    reject(`Error: ${response.status}: ${response.statusText}`);
                }
            })
            .catch((error) => {
                reject(error);
            });

        });
    }
}