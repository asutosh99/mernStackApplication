import express from "express";
// import { updatePost } from "../../client/src/api/index.js";
import { getPost,creatPosts,updatePost,deletePost,likePost } from "../controller/posts.js";
const router=express.Router();


router.get('/',getPost);    
router.post('/',creatPosts);
router.patch('/:id',updatePost);    
router.delete('/:id',deletePost);
router.patch('/:id/likePost',likePost);


export default router;