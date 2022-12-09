import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionsButtons from './ReactionsButtons';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectPostById } from './postsSlice';

const PostExcerpt = ({ postId }) => {
  const post = useSelector((state) => selectPostById(state, postId));

  const { title, id, userId, date, body } = post;

  return (
    <article>
      <h2>{title}</h2>
      <p className="excerpt">{body.substring(0, 75)}...</p>
      <p className="postCredit">
        <Link to={`post/${id}`}>View Post</Link>
        <PostAuthor userId={userId} />
        <TimeAgo timestamp={date} />
      </p>
      <ReactionsButtons post={post} />
    </article>
  );
};

export default PostExcerpt;
