export interface IAddCommentFormProps {
  title: string;
  description: string;
  commentText: string;
  onAddComment: (comment: string) => void;
  message: string;
}
