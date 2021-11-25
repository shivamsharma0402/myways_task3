const Blog = require('../models/blog.model');
const Comment = require('../models/comment.model');


exports.createBlog = async (req,res,next) => {
  const { title, content } = req.body;
  try {
    const blog = new Blog({
      title: title,
      content: content,
      createdBy: req.user.userid
    });
    await blog.save();
    return res.status(200).json({ status: "success", message: "blog created!", data: blog });
  } catch(error) {
    if(!error.statusCode){
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.readBlog = async (req,res,next) => {
  try {
    const blogs = await Blog.find();
    if(!blogs.length){
      const error = new Error('No blogs found!');
      error.statusCode = 404;
      throw error;
    }
    return res.status(201).json({  status: "success", message: `${blogs.length} blog(s) found!`, data: blogs })
  } catch (err) {
    if(!err.statusCode){
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateBlog = async (req,res,next) => {
  const { blogid } = req.query;
  const { updatedTitle, updatedContent } = req.body;
  console.log(updatedTitle, updatedContent );
  try {
    const blog = await Blog.findByIdAndUpdate(blogid, {
      title: updatedTitle,
      content: updatedContent,
      updatedAt: new Date()
    });
    console.log(blog);
    if(!blog) {
      const error = new Error('No blogs found!');
      error.statusCode = 404;
      throw error;
    }
      return res.status(200).json({ status: "success", message: "blog updated!" });
  } catch(error) {
    if(!error.statusCode){
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.deleteBlog = async (req,res,next) => {
  const { blogid } = req.query;
  try {
    const blog = await Blog.findByIdAndDelete(blogid);
    if(!blog) {
      const error = new Error('No blogs found!');
      error.statusCode = 404;
      throw error;
    }
      return res.status(200).json({ status: "success", message: "blog deleted!" });
  } catch(error) {
    if(!error.statusCode){
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.addComment = async (req,res,next) => {
  const { blogid } = req.query;
  const { commentBody } = req.body;
  try {
    const blog = await Blog.findById(blogid);
    if(!blog) {
      const error = new Error('No blogs found!');
      error.statusCode = 404;
      throw error;
    }
    const comment = new Comment({
      text: commentBody,
      commentBy: req.user.userid
    });
    await comment.save();

    blog.comments.push(comment);
    await blog.save();
      return res.status(200).json({ 
        status: "success", 
        message: "comment added successfully!",
        comment:  comment });
  } catch(error) {
    if(!error.statusCode){
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.searchAllCommentsForAUser = async (req,res,next) => {
  try {
    const blogs = await Blog.find().populate('comments');
    console.log(blogs);
    result=[]
    blogs.forEach((blog=>{
      blog.comments.forEach(comment=>{
        console.log(comment.commentBy);
        console.log(req.user.userid);
        if(comment.commentBy == req.user.userid)
          result.push(blog);
    console.log(result);
      });
    }));

  } catch(error) {
    if(!error.statusCode){
      error.statusCode = 500;
    }
    next(error);
  }
};
