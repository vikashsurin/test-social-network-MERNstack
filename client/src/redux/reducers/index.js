import { combineReducers } from "redux";
import auth from "./#auth";
import profile from "./#profile";
import posts from "./#posts";
export default combineReducers({
  auth,
  profile,
  posts
});
