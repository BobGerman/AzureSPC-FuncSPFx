export interface IAddCommentProps {
  title: string;
  description: string;
  onAddComment: (comment: string) => void;
  message: string;
}
