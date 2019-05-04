import PostFactoryJSON from "../contracts/PostFactory";
import PostJSON from "../contracts/Post";
import UserFactoryJSON from "../contracts/UserFactory";
import UserJSON from "../contracts/User";
import CommentJSON from "../contracts/Comment.json";

export const contracts_json = [UserFactoryJSON, PostFactoryJSON, UserJSON, CommentJSON]

export const initialize = ["UserFactory", "PostFactory"];