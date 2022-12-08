import PostAuthor from './PostAuthor';
import TImeAgo from './TImeAgo';
import ReactionsButtons from './ReactionsButtons';

const PostExcerpt = ({ post }) => {
  console.log(post);
  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.body.substring(0, 100)}</p>
      <p className="postCredit">
        <PostAuthor userId={post.userId} />
        <TImeAgo timestamp={post.date} />
      </p>
      <ReactionsButtons post={post} />
    </article>
  );
};

export default PostExcerpt;
