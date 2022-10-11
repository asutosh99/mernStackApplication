import mongoose from "mongoose";
import postMessage from "../models/postMessage.js";

export const getPost = async (req, res) => {
  try {
    const posts = await postMessage.find();
    res.status(200).send(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const creatPosts = async (req, res) => {
  const post = req.body;
  let newPost = new postMessage(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.log("error in backend");
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No post with id:`);
  const updatePost = await postMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    { new: true }
  );
  res.json(updatePost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id:`);
  await postMessage.findByIdAndRemove(id);
  res.json({ message: "sucessfully deleted" });
  console.log("deleted");
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id:`);
  // console.log('like in backend1');

  try {
    // console.log('like in backend1');
    const post = await postMessage.findById(id);
    const updatePost = await postMessage.findByIdAndUpdate(
      id,
      { likeCount: post.likeCount + 1 },
      { new: true }
    );
    // console.log(updatePost);
    res.json(updatePost);
  } catch (error) {
    console.log(error);
  }
};
