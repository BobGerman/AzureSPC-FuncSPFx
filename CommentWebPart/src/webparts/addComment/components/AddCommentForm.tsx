import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styles from './AddComment.module.scss';
import { IAddCommentFormProps } from './IAddCommentFormProps';
import { IAddCommentFormState } from './IAddCommentFormState';
import { escape } from '@microsoft/sp-lodash-subset';

export default class AddComment extends React.Component<IAddCommentFormProps, IAddCommentFormState> {

  private inputElement: HTMLInputElement;

  constructor(props) {
    super();
    this.state = {
      commentText: props.commentText,
      message: props.message,
      editing: true
    };
  }


  public render(): React.ReactElement<IAddCommentFormProps> {

    if (!this.state.editing) {
      this.state = {
        commentText: this.props.commentText,
        message: this.props.message,
        editing: true
      };
    }

    return (
      <div className={ styles.addComment }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <div className={ styles.title }>{escape(this.props.title)}</div>
              <div className={ styles.description }>{escape(this.props.description)}</div>
              <p>
                <input value={ this.state.commentText } 
                       ref={(elt) => { this.inputElement = elt; }}
                       onChange={e => this.setState({ 
                         commentText: e.target.value,
                         message: "",
                         editing: true
                        })}
                       />&nbsp;&nbsp;&nbsp;
                <button onClick={ this.onAdd.bind(this) } className={ styles.button }>Add</button>&nbsp;
                <button onClick={ this.onCancel.bind(this) } className={ styles.button2 }>Cancel</button>
              </p>
              <div>{this.state.message}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  
  private onAdd() {
    this.props.onAddComment(this.state.commentText);
    this.setState({
      ...this.state,
      message: "(processing...)",
      editing: false
    });
  }
  private onCancel() {
    this.setState({
      commentText: "",
      message: "",
      editing: true
    });
  }
}
