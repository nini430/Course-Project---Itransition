import { ButtonGroup, Button, ClickAwayListener } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { Comment } from '../../types/comment';
import { useAppDispatch } from '../../store/store';
import { setCommentEditMode } from '../../store/itemReducer';
import { useTranslation } from 'react-i18next';

interface IActionButtonsProps {
  setConfirmDialog: Dispatch<SetStateAction<null | Comment>>;
  comment: Comment;
  setIsInEditMode: Dispatch<SetStateAction<boolean>>;
  setIsMoreShown: Dispatch<SetStateAction<boolean>>;
  setEditComment: Dispatch<SetStateAction<string>>;
}

const ActionButtons = ({
  setConfirmDialog,
  comment,
  setIsInEditMode,
  setIsMoreShown,
  setEditComment,
}: IActionButtonsProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const moreVertElement = document.getElementById('more-vert');
  const commentAction =
    document.getElementsByClassName('comment-action-btn')[0];
  return (
    <ClickAwayListener
      onClickAway={(e) => {
        if (
          e.target &&
          moreVertElement &&
          !moreVertElement?.contains(e.target as Node) &&
          commentAction &&
          !commentAction.contains(e.target as Node)
        ) {
          setIsMoreShown(false);
        }
      }}
    >
      <div>
        <ButtonGroup
          className="comment-action-btn"
          sx={{ position: 'absolute', right: 20, top: -10 }}
        >
          <Button
            onClick={() => {
              setIsInEditMode(true);
              setIsMoreShown(false);
              setEditComment(comment.text);
              dispatch(setCommentEditMode(true));
            }}
            sx={{ border: '1px solid gray' }}
          >
            {t('common.edit')}
          </Button>
          <Button
            onClick={() => {
              setConfirmDialog(comment);
              setIsMoreShown(false);
            }}
            sx={{ border: '1px solid gray' }}
          >
            {t('common.delete')}
          </Button>
        </ButtonGroup>
      </div>
    </ClickAwayListener>
  );
};

export default ActionButtons;
