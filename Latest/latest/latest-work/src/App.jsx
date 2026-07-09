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
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />

        {/* Protected Routes */}

        <Route
          path="/student/update/:id"
          element={
            <ProtectedRoute>
              <>
                <Header />
                <Form />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/AllStudent"
          element={
            <ProtectedRoute>
              <>
                <Header />
                <AllStudent />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/getting/:id"
          element={
            <ProtectedRoute>
              <>
                <Header />
                <ViewStudent />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/Inactive"
          element={
            <ProtectedRoute>
              <>
                <Header />
                <Inactive />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/Post"
          element={
            <ProtectedRoute>
              <>
                <Header />
                <Post />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/post/update/:id"
          element={
            <ProtectedRoute>
              <>
                <Header />
                <Post />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/AllPosts"
          element={
            <ProtectedRoute>
              <>
                <Header />
                <AllPosts />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/post/:id"
          element={
            <ProtectedRoute>
              <>
                <Header />
                <SinglePost />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/InactivePost"
          element={
            <ProtectedRoute>
              <>
                <Header />
                <InactivePost />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/AdminShow"
          element={
            <ProtectedRoute>
              <>
                <Header />
                <AdminShow />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/MyTask"
          element={
            <ProtectedRoute>
              <>
                <Header />
                <MyTask />
              </>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;