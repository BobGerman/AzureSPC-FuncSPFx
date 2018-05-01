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
  description: string;
}

export default class AddCommentWebPart extends BaseClientSideWebPart<IAddCommentWebPartProps> {

  public render(): void {
    const svc = CommentServiceFactory.getCommentService(Environment.type);

    const element: React.ReactElement<IAddCommentProps > = React.createElement(
      AddComment,
      {
        title: "TITLE",
        description: this.properties.description,
        message: "MESSAGE",
        onAddComment: (comment) => {svc.addComment(null, null, null, null, {text:"Mock"});}
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
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
