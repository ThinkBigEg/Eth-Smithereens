import PostFactoryJSON from "../contracts/PostFactory";
import PostJSON from "../contracts/Post";
import UserFactoryJSON from "../contracts/UserFactory";
import UserJSON from "../contracts/User";
import CommentJSON from "../contracts/Comment.json";
import OriginalPostJSON from "../contracts/OriginalPost.json";
import SharedPostJSON from "../contracts/SharedPost.json";
import GroupFactoryJSON from "../contracts/GroupFactory.json";
import GroupJSON from "../contracts/Group";

export const contracts = [UserFactoryJSON, PostFactoryJSON, UserJSON, CommentJSON, OriginalPostJSON, SharedPostJSON, PostJSON, GroupFactoryJSON, GroupJSON]

export const initialize = ["UserFactory", "PostFactory", "GroupFactory"];