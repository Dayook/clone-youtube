const express = require("express");
const router = express.Router();
const { Comment } = require("../models/Comment");

//=================================
//             Subscribe
//=================================

router.post("/saveComment", (req, res) => {
  console.log("here we go");
  const comment = new Comment(req.body);
  comment.save((err, comment) => {
    if (err) return res.json({ success: false, err });

    Comment.find({ _id: comment._id })
      .populate("write")
      .exec((err, result) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({ success: true, result });
      });
  });
});

module.exports = router;
