const express = require('express');
const router = express.Router();

const {
  createBlog,
  readBlog,
  updateBlog,
  deleteBlog,
  addComment,
  searchAllCommentsForAUser
} = require('../controllers/blog.controller');
const adminAuth = require('../middlewares/adminAuth.middleware');
const userAuth = require('../middlewares/userAuth.middleware');



router.route('/create').post(adminAuth, createBlog);
router.route('/read').get(userAuth, readBlog);
router.route('/read/addComment').post(userAuth, addComment);
router.route('/update').put(adminAuth, updateBlog);
router.route('/delete').delete(adminAuth, deleteBlog);

router.route('/read/mycomments').get(userAuth, searchAllCommentsForAUser);

module.exports = router;


