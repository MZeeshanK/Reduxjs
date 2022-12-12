import { useState } from 'react';

import { useSelector } from 'react-redux';
import { selectPostById, updatePost, deletePost } from './postsSlice';

import { useParams, useNavigate } from 'react-router-dom';
import { selectAllUsers } from '../users/usersSlice';

import { useUpdatePostMutation, useDeletePostMutation } from './postsSlice';

const EditPostForm = () => {
  const { postId } = useParams(),
    navigate = useNavigate();

  const [updatePost, { isLoading }] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();

  const post = useSelector((state) => selectPostById(state, Number(postId))),
    users = useSelector(selectAllUsers);

  const [title, setTitle] = useState(post?.title),
    [content, setContent] = useState(post?.body),
    [userId, setUserId] = useState(post?.userId);

  if (!post) {
    return (
      <section>
        <h2>Post Not found!</h2>
      </section>
    );
  }

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(Number(e.target.value));

  const canSave = [title, content, userId].every(Boolean) && !isLoading;

  const onSaveClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        await updatePost({
          id: post.id,
          title,
          body: content,
          userId,
        }).unwrap();

        setTitle('');
        setContent('');
        setUserId('');
        navigate(`/post/${postId}`);
      } catch (error) {
        console.error('Failed to save the post', error);
      }
    }
  };

  const onDeleteClicked = async () => {
    try {
      if (window.confirm('Are you Sure')) {
        await deletePost({ id: post.id }).unwrap();

        setTitle('');
        setContent('');
        setUserId('');
        alert('Post Deleted');
        navigate('/');
      }
    } catch (error) {
      console.error('Failed to save the post', error);
    }
  };

  const userOptions = users.map((user) => (
    <option value={user.id} key={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Post Author:</label>
        <select
          type="text"
          id="postAuthor"
          name="postAuthor"
          defaultValue={userId}
          onChange={onAuthorChanged}
        >
          <option value=""></option>
          {userOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        ></textarea>

        <button type="submit" onClick={onSaveClicked} disabled={!canSave}>
          Save Post
        </button>

        <button
          type="button"
          className="deleteButton"
          onClick={onDeleteClicked}
        >
          Delete Post
        </button>
      </form>
    </section>
  );
};

export default EditPostForm;
