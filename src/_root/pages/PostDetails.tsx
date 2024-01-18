import PostStars from "@/components/shared/PostStars";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useGetPostById } from "@/lib/react-query/queriesAndMutations";
import { multiFormatDateString } from "@/lib/utils";
import { Loader } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const PostDetails = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || "");
  const { user } = useUserContext();
  const handleDeletePost = () => {};
  return (
    <div className="post_details-container">
      {isPending ? (
        <Loader />
      ) : (
        <div className="post_details-card">
          <img
            src={post?.imageUrl}
            alt="post image"
            className="post_details-img"
          />
          <div className="post_details-info">
            <div className="flex justify-between w-full">
              <Link
                to={`/profile/${post?.creator.$id}`}
                className="flex items-center gap-2"
              >
                <img
                  src={
                    post?.creator?.imageUrl ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="rounded-full w-12 h-12"
                />
                <div className="flex flex-col">
                  <p className="base-medium lg:body-bold text-light-1">
                    {post?.creator.name}
                  </p>
                  <div className="flex-center gap-2 text-light-3">
                    <p className="subtle-semibold lg:small-regular">
                      {multiFormatDateString(post?.$createdAt)}
                    </p>
                    -
                    <p className="subtle-semibold lg:small-regular">
                      {post?.location}
                    </p>
                  </div>
                </div>
              </Link>
              <div
                className={`flex-center ${
                  user.id !== post?.creator.$id && "hidden"
                }`}
              >
                <Link to={`/update-post/${post?.$id}`}>
                  <img
                    src="/assets/icons/edit.svg"
                    alt="edit"
                    width={24}
                    height={24}
                  />
                </Link>
                <Button
                  className="ghost_details-delete_btn"
                  onClick={handleDeletePost}
                  variant="ghost"
                >
                  <img
                    src="/assets/icons/delete.svg"
                    alt="delete"
                    width={24}
                    height={24}
                  />
                </Button>
              </div>
            </div>
            <hr className="border w-full border-dark-4/80" />
            <div className="flex flex-col flex-1 w-full small-medium lg:base-madium">
              <p>{post?.caption}</p>
              <ul className="flex gap-1 mt-2">
                {post?.tags.map((tag: string) => (
                  <li key={tag} className="text-light-3">
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>
            <PostStars post={post} userId={user.id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
