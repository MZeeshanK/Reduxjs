import { useSelector } from 'react-redux';
import { selectPostById } from './postsSlice';
import { useParams, Link } from 'react-router-dom';

import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionsButtons from './ReactionsButtons';

const SinglePostPage = () => {
  const { postId } = useParams();

  const post = useSelector((state) => selectPostById(state, Number(postId)));

  if (!post) {
    return (
      <section>
        <h2>Post Not found!</h2>
      </section>
    );
  }

  const { title, body, userId, date } = post;

  return (
    <article>
      <h2>{title}</h2>
      <p>{body}</p>
      <p className="postCredit">
        <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
        <PostAuthor userId={userId} />
        <TimeAgo timestamp={date} />
      </p>
      <ReactionsButtons post={post} />
    </article>
  );
};

export default SinglePostPage;
