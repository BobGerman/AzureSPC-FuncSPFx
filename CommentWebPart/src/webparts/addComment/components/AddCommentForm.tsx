import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styles from './AddComment.module.scss';
import { IAddCommentFormProps } from './IAddCommentFormProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class AddComment extends React.Component<IAddCommentFormProps, { }> {

  private inputElement: HTMLInputElement;

  constructor(props) {
    super();
  }


  public render(): React.ReactElement<IAddCommentFormProps> {

    return (
      <div className={ styles.addComment }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <div className={ styles.title }>{escape(this.props.title)}</div>
              <div className={ styles.description }>{escape(this.props.description)}</div>
              <p>
                <input value={ this.props.commentText } 
                       ref={(elt) => { this.inputElement = elt; }}
                       onChange={e => this.props.onChangeComment(e.target.value) }
                       />&nbsp;&nbsp;&nbsp;
                <button onClick={ this.onAdd.bind(this) } className={ styles.button }>Add</button>&nbsp;
                <button onClick={ this.onCancel.bind(this) } className={ styles.button2 }>Cancel</button>
              </p>
              <div>{this.props.message}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  
  private onAdd() {
    this.props.onAddComment(this.inputElement.value);
  }
  private onCancel() {
    this.props.onCancel();
  }
}
