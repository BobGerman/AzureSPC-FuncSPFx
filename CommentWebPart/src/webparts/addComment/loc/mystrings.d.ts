declare interface IAddCommentWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  ServiceGroupName: string;
  TitleFieldLabel: string;
  DescriptionFieldLabel: string;
  ClientIdFieldLabel: string;
  EndpointUrlFieldLabel: string;
  FunctionCodeFieldLabel: string;
}

declare module 'AddCommentWebPartStrings' {
  const strings: IAddCommentWebPartStrings;
  export = strings;
}
