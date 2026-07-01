import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Form from "./Form";
import AllStudent from "./AllStudent";
import ViewStudent from "./ViewStudent";
import Inactive from "./Inactive";
import Signup from "./Signup";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import ForgetPassword from "./ForgetPassword";
import ResetPassword from "./ResetPassword";
import Post from "./Post";
import AllPosts from "./AllPosts";
import SinglePost from "./SinglePost";
import InactivePost from "./InactivePost";
import AdminShow from "./AdminShow";
import MyTask from "./MyTask";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />

        {/* <Route
          path="/"
          element={
            <ProtectedRoute>
              <Form />
            </ProtectedRoute>
          }
        /> */}

        <Route
          path="/student/update/:id"
          element={
            <ProtectedRoute>
              <Form />
            </ProtectedRoute>
          }
        />

        <Route
          path="/AllStudent"
          element={
            <ProtectedRoute>
              <AllStudent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/getting/:id"
          element={
            <ProtectedRoute>
              <ViewStudent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Inactive"
          element={
            <ProtectedRoute>
              <Inactive />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Post"
          element={
            <ProtectedRoute>
              <Post />
            </ProtectedRoute>
          }
        />
        <Route
          path="/post/update/:id"
          element={
            <ProtectedRoute>
              <Post />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AllPosts"
          element={
            <ProtectedRoute>
              <AllPosts />
            </ProtectedRoute>
          }
        />

        {/* View Page */}
        <Route
          path="/post/:id"
          element={
            <ProtectedRoute>
              <SinglePost />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/InactivePost"
          element={
            <ProtectedRoute>
              <InactivePost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AdminShow"
          element={
            <ProtectedRoute>
              <AdminShow />
            </ProtectedRoute>
          }
        />

        <Route
          path="/MyTask"
          element={
            <ProtectedRoute>
              <MyTask />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
