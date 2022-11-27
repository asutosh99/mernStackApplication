import express from "express";
// import { updatePost } from "../../client/src/api/index.js";
import { getPost,creatPosts,updatePost,deletePost,likePost } from "../controller/posts.js";
const router=express.Router();
// import auth from '../middleware/auth'
import auth from "../middleware/auth.js";

router.get('/',getPost);    
router.post('/',auth,creatPosts);
router.patch('/:id',auth,updatePost);    
router.delete('/:id',auth,deletePost);
router.patch('/:id/likePost',auth,likePost);


export default router;