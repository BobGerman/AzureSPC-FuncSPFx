import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ServiceScope } from '@microsoft/sp-core-library';
import { IComment } from '../model/IComment';
import { ICommentService } from './ICommentService';
import { HttpClient } from '@microsoft/sp-http';

interface ICommentServiceBody {
    siteUrl: string;
    comment: string;
}

export default class FuncCommentService implements ICommentService {

    public addComment(context: IWebPartContext,
                      serviceScope: ServiceScope,
                      clientOrFunctionId: string,
                      endpointUrl: string,
                      comment: IComment) : Promise<void | string> {

        var httpClient : HttpClient = new HttpClient(serviceScope);
        var siteUrl = context.pageContext.web.absoluteUrl;

        var body: ICommentServiceBody = {
            "siteUrl": siteUrl,
            "comment": comment.text
        };

        const headers: HeadersInit = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("x-functions-key", clientOrFunctionId);

        return new Promise<void | string> ((resolve, reject) => {

            httpClient.post(endpointUrl, HttpClient.configurations.v1, {
                headers: headers,
                body: JSON.stringify(body)
            })
            .then((response) => {
                if (response.status == 200) {
                    resolve();
                } else {
                    reject(`Error ${response.status}: ${response.statusText}`);
                }
            })
            .catch((error) => {
                reject(error);
            });

        });
    }
}