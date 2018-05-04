import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, Environment } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'AddCommentWebPartStrings';
import AddComment from './components/AddComment';
import { IAddCommentProps } from './components/IAddCommentProps';
import { IComment } from './model/IComment';
import { ICommentService } from './service/ICommentService';
import { CommentServiceFactory } from './service/CommentServiceFactory';

export interface IAddCommentWebPartProps {
  title: string;
  description: string;
  clientId: string;
  endpointUrl: string;
  functionCode: string;
}

export default class AddCommentWebPart extends BaseClientSideWebPart<IAddCommentWebPartProps> {

  public render(): void {
    const isAad = (this.properties.clientId != "");
    const svc = CommentServiceFactory.getCommentService(Environment.type, isAad);
    const message = "";

    const element: React.ReactElement<IAddCommentProps > = React.createElement(
      AddComment, {
        context: this.context,
        serviceScope: this.context.serviceScope,
        commentService: svc,
        title: this.properties.title,
        description: this.properties.description,
        clientId: this.properties.clientId,
        endpointUrl: this.properties.endpointUrl
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('title', {
                  label: strings.TitleFieldLabel
                }),
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            },
            {
              groupName: strings.ServiceGroupName,
              groupFields: [
                PropertyPaneTextField('clientId', {
                  label: strings.ClientIdFieldLabel
                }),
                PropertyPaneTextField('functionCode', {
                  label: strings.FunctionCodeFieldLabel
                }),
                PropertyPaneTextField('endpointUrl', {
                  label: strings.EndpointUrlFieldLabel
                })
              ]
            }            
          ]
        }
      ]
    };
  }
}
