import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styles from './AddComment.module.scss';
import { IAddCommentProps } from './IAddCommentProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class AddComment extends React.Component<IAddCommentProps, {}> {

  private inputElement: HTMLInputElement;

  public render(): React.ReactElement<IAddCommentProps> {
    return (
      <div className={ styles.addComment }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <div className={ styles.title }>{escape(this.props.title)}</div>
              <div className={ styles.description }>{escape(this.props.description)}</div>
              <p>
                <input ref={(elt) => { this.inputElement = elt}} />&nbsp;&nbsp;&nbsp;
                <button onClick={ this.onAdd.bind(this) } className={ styles.button }>Add</button>&nbsp;
                <button onClick={ this.onCancel.bind(this) } className={ styles.button2 }>Cancel</button>
              </p>
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
  
  }
}
