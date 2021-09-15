import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Tooltip, Icon } from "antd";
import { PromiseProvider } from "mongoose";

function LikeDislikes(props) {
  const [Likes, setLikes] = useState(0);
  const [Dislikes, setDislikes] = useState(0);
  const [LikeAction, setLikeAction] = useState(null);
  const [DislikeAction, setDislikeAction] = useState(null);
  let variable = {};

  if (props.video) {
    variable = { videoId: props.videoId, userId: props.userId };
  } else {
    variable = { commentId: props.commentID, userId: props.userId };
  }

  const doLike = () => {
    if (LikeAction === null) {
      Axios.post("/api/like/uplike", variable).then((response) => {
        if (response.data.success) {
          setLikes(Likes + 1);
          setLikeAction("liked");

          if (DislikeAction !== null) {
            setDislikeAction(null);
            setDislikes(Dislikes - 1);
          }
        }
      });
    } else {
      Axios.post("/api/like/downlike", variable).then((response) => {
        if (response.data.success) {
          setLikes(Likes - 1);
          setLikeAction(null);
        }
      });
    }
  };

  const doDislike = () => {
    if (DislikeAction === null) {
      Axios.post("/api/like/upDislike", variable).then((response) => {
        if (response.data.success) {
          setDislikes(Dislikes + 1);
          setDislikeAction("disliked");

          if (LikeAction !== null) {
            setLikeAction(null);
            setLikes(Likes - 1);
          }
        }
      });
    } else {
      Axios.post("/api/like/downDislike", variable).then((response) => {
        if (response.data.success) {
          setDislikes(Dislikes - 1);
          setDislikeAction(null);
        }
      });
    }
  };

  useEffect(() => {
    Axios.post("/api/like/getLikes", variable).then((response) => {
      if (response.data.success) {
        // 1. 좋아요 싫어요 숫자
        setLikes(response.data.likes.length);
        // 2. 내가 눌렀는지 여부
        response.data.likes.map((like) => {
          if (like.userId === props.userId) {
            setLikeAction("liked");
          }
        });
      } else {
        alert("like에 정보를 찾을 수 없습니다");
      }
    });

    Axios.post("/api/like/getDislikes", variable).then((response) => {
      if (response.data.success) {
        // 1. 좋아요 싫어요 숫자
        setDislikes(response.data.dislikes.length);
        // 2. 내가 눌렀는지 여부
        response.data.dislikes.map((dislike) => {
          if (dislike.userId === props.userId) {
            setDislikeAction("disliked");
          }
        });
      } else {
        alert("cannot load dislike information");
      }
    });
  }, []);

  return (
    <React.Fragment>
      <div>
        <span key="comment-basic-like">
          <Tooltip title="Like">
            <Icon
              type="like"
              theme={LikeAction === "liked" ? "filled" : "outlined"}
              style={{ fontSize: "20px" }}
              onClick={doLike}
            />
            {/* <Icon type="like" style={{ fontSize: "3rem" }} /> */}
          </Tooltip>
          <span style={{ paddingLeft: "8px", cursor: "auto" }}> {Likes}</span>
          <span key="comment-basic-dislike">
            <Tooltip title="Dislike">
              <Icon
                type="dislike"
                theme={DislikeAction === "disliked" ? "filled" : "outlined"}
                style={{ fontSize: "20px" }}
                onClick={doDislike}
              />
            </Tooltip>
            <span style={{ paddingLeft: "8px", cursor: "auto" }}>
              {" "}
              {Dislikes}{" "}
            </span>
          </span>
        </span>
      </div>
    </React.Fragment>
  );
}

export default LikeDislikes;
