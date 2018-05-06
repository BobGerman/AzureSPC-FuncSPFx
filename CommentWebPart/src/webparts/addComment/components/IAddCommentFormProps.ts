export interface IAddCommentFormProps {
  title: string;
  description: string;
  caption: string;
  commentText: string;
  onChangeComment: (comment: string) => void;
  onAddComment: (comment: string) => void;
  onCancel: () => void;
  message: string;
}
