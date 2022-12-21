import { useEffect } from "react";
import Loading from "../components/loading/Loading";

const PostForm = ({ postFormData }) => {
  useEffect(() => {
    setTimeout(() => {
      document.getElementsByClassName("postForm")[0].submit();
    }, "5000");
  }, [postFormData.endpoint]);

  return (
    <>
      <Loading />
      <form method="POST" action={postFormData.endpoint} className="postForm">
        <input
          type="hidden"
          name="username"
          defaultValue={postFormData.payload.username}
        />
        <input
          type="hidden"
          name="password"
          defaultValue={postFormData.payload.password}
        />
        <input
          type="hidden"
          name="_csrfhash"
          defaultValue={postFormData.payload._csrfhash}
        />
        <input
          type="hidden"
          name="_nonce"
          defaultValue={postFormData.payload._nonce}
        />
      </form>
    </>
  );
};

export default PostForm;
