import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useLikePost,
  useSavedPost,
} from "@/lib/react-query/queriesAndMutations";
import { checkIsLiked } from "@/lib/utils";
import { Models } from "appwrite";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";

type PostStarsProps = {
  post?: Models.Document;
  userId: string;
};
const PostStars = ({ post, userId }: PostStarsProps) => {
  const likeList = post?.likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState(likeList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost, isPending: isSavedLoading } = useSavedPost();
  const { mutate: deleteSavedPost, isPending: isDeleteSaved } =
    useDeleteSavedPost();

  const { data: currentUser } = useGetCurrentUser();

  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post?.$id
  );

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser]);

  const handlerLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();
    let newLikes = [...likes];

    const hadLike = newLikes.includes(userId);

    if (hadLike) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }

    setLikes(newLikes);
    likePost({ postId: post?.$id || "", likeArray: newLikes });
  };

  const handlerSavedPost = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      deleteSavedPost(savedPostRecord.$id);
      return;
    }
    savePost({ postId: post?.$id || "", userId });
    setIsSaved(true);
  };
  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        <img
          src={`/assets/icons/${
            checkIsLiked(likes, userId) ? "liked" : "like"
          }.svg`}
          alt="like"
          width={20}
          height={20}
          onClick={handlerLikePost}
          className="cursor-pointer"
        />
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>
      <div className="flex gap-2">
        {isSavedLoading || isDeleteSaved ? (
          <Loader />
        ) : (
          <img
            src={`/assets/icons/${isSaved ? "saved" : "save"}.svg`}
            alt="like"
            width={20}
            height={20}
            onClick={handlerSavedPost}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default PostStars;
