import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IAddCommentProps } from './IAddCommentProps';
import { IAddCommentState } from './IAddCommentState';
import { escape } from '@microsoft/sp-lodash-subset';

import AddCommentForm from './AddCommentForm';
import { IAddCommentFormProps } from './IAddCommentFormProps';
import { IComment } from '../model/IComment';
import { ICommentService } from '../service/ICommentService';

export default class AddComment extends React.Component<IAddCommentProps, IAddCommentState> {

  private inputElement: HTMLInputElement;

  constructor () {
    super();
    this.state = {
      commentText: "",
      message: ""
    };
  }

  public render(): React.ReactElement<IAddCommentProps> {
    return (
      <div>
        <AddCommentForm title={ this.props.title } 
                        description={ this.props.description }
                        caption={ this.props.caption }
                        commentText={ this.state.commentText }
                        onAddComment={ (c) => {
                          if (c) {
                            this.setState({
                              commentText: c,
                              message: "(sending)"
                            });
                            this.props.commentService.addComment(
                              this.props.context, this.props.serviceScope,
                              this.props.clientId, this.props.endpointUrl,
                              { text: c }
                            )
                            .then(() => {
                              this.setState({
                                commentText: "",
                                message: "Your comment has been posted"
                              });
                            })
                            .catch((error) => {
                              this.setState({
                                commentText: c,
                                message: `ERROR ${escape(error)}`
                              });
                            });
                          } else {
                            this.setState ( {...this.state, message: "Please enter a comment"});
                          }
                        }
                      }
                      onChangeComment={ (c) => {
                        this.setState({
                          commentText: c,
                          message: ""
                        });
                      } }
                      onCancel={ () => {
                        this.setState({
                          commentText: "",
                          message: ""
                        });
                      } }
                      message={ this.state.message } />
      </div>
    );
  }

}
