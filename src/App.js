// import Counter from './features/counter/Counter';
import PostList from './features/posts/PostList';
import AddPostForm from './features/posts/AddPostForm';
import SinglePostPage from './features/posts/SinglePostPage';
import EditPostForm from './features/posts/EditPostForm';
import UserList from './features/users/UserList';
import UserPage from './features/users/UserPage';
import Layout from './components/Layout';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostList />} />

        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePostPage />} />
          <Route path="edit/:postId" element={<EditPostForm />} />
        </Route>

        <Route path="users">
          <Route index element={<UserList />} />
          <Route path=":userId" element={<UserPage />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
      {/* <Counter /> */}
    </Routes>
  );
}

export default App;
