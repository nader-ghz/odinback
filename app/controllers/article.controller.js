const db = require("../models");
const Article = db.article;
const User = db.user;
const Commentaires = db.commentaires;
const UserLikes = db.userLikes;
const Op = db.Sequelize.Op;
const sql = db.sequelize;

const getPagination = (page, size) => {
  const limit = size ? +size : 9;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: rows } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, rows, totalPages, currentPage };
};

exports.create = async (req, res) => {
  try {
    if (
      !req.body.titre ||
      !req.body.description ||
      !req.body.userId ||
      !req.body.type ||
      !req.file
    ) {
      res.status(500).send({
        message: "Fill all the infos",
      });
      return;
    } else {


      let mediaType;
      if (req.file && req.file.mimetype.startsWith('image')) {
        mediaType = 'image';
      } else if (req.file && req.file.mimetype.startsWith('video')) {
        mediaType = 'video';
      } else {
        return res.status(400).send({
          message: "Unsupported media type",
        });
      }



      var imgsrc = "http://localhost:8088/uploads/" + req.file.filename;
      Article.create({
        titre: req.body.titre,
        description: req.body.description,
        image: mediaType === 'image' ? imgsrc : null,
        video: mediaType === 'video' ? imgsrc : null,
        etat: "0",
        userId: req.body.userId,
        type: req.body.type,
      })
        .then((data) => {
          res.status(200).send({
            message: "Success",
            data: data,
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "Some error occurred",
          });
        });
    }
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying creating Blog: ${error}`);
  }
};

exports.findByUserId = (req, res) => {
  const { userId } = req.params;

  Article.findAll({
    where: { userId: userId },
    attributes: ['id', 'titre', 'description', 'image', 'video', 'createdAt', 'updatedAt'],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving articles by userId.",
      });
    });
};



exports.findAll = (req, res) => {
  const { page, size, type } = req.query;
  const { limit, offset } = getPagination(page, size);
  let condition = type ? { type: { [Op.like]: `%${type}%` } } : null;

  Article.findAndCountAll({
    where: condition,
    limit,
    offset,
    attributes: {
      include: [
        [
          sql.fn("DATE_FORMAT", sql.col("createdAt"), "%d-%m-%Y %H:%i:%s"),
          "createdAt",
        ],
        [
          sql.fn("DATE_FORMAT", sql.col("updatedAt"), "%d-%m-%Y %H:%i:%s"),
          "updatedAt",
        ],
      ],
    },
  })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Blogs.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Article.findByPk(id, {
    attributes: {
      include: [
        [
          sql.fn("DATE_FORMAT", sql.col("createdAt"), "%d-%m-%Y %H:%i:%s"),
          "createdAt",
        ],
        [
          sql.fn("DATE_FORMAT", sql.col("updatedAt"), "%d-%m-%Y %H:%i:%s"),
          "updatedAt",
        ],
      ],
    },
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Article with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Article with id=" + id,
      });
    });
};

// exports.update = (req, res) => {
//   const id = req.params.id;
//   Article.update(req.body, {
//     where: { id: id },
//   })
//     .then((num) => {
//       if (num == 1) {
//         res.send({
//           message: "Article was updated successfully.",
//         });
//       } else {
//         res.send({
//           message: `Cannot update Article with id=${id}. Maybe Article was not found or req.body is empty!`,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: "Error updating Article with id=" + id,
//       });
//     });
// };
exports.update = async (req, res) => {
  const { id } = req.params;

  try {
    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).send({
        message: `Article with id=${id} not found.`,
      });
    }

    // Check if the user making the request is the owner of the article
    // You can uncomment this block if you have user authentication enabled
    // if (req.user.id !== article.userId) {
    //   return res.status(403).send({
    //     message: "You do not have permission to update this article.",
    //   });
    // }

    // Update article properties
    article.titre = req.body.titre || article.titre;
    article.description = req.body.description || article.description;

    // Handle updating image
    if (req.file && req.file.mimetype.startsWith('image')) {
      // Assuming you have a directory named 'uploads' for storing images
      const imgsrc = "http://localhost:8088/uploads/" + req.file.filename;
      article.image = imgsrc || article.image;
    }

    // Handle updating video
    if (req.file && req.file.mimetype.startsWith('video')) {
      // Assuming you have a directory named 'uploads' for storing videos
      const videoSrc = "http://localhost:8088/uploads/" + req.file.filename;
      article.video = videoSrc;
    }

    // Save the updated article
    await article.save();

    return res.status(200).send({
      message: "Article updated successfully",
      data: article,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "Error updating article",
    });
  }
};


exports.delete = (req, res) => {
  const id = req.params.id;
  Commentaires.destroy({
    where: {
      articleId: id,
    },
  });
  Article.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Article was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Article with id=${id}. Maybe Article was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Article with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Article.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Articles were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Articles.",
      });
    });
};

exports.addLikeToArticle = async (req, res) => {
  const { articleId } = req.params;
  const { userId } = req.body;

  if (!articleId || !userId) {
    return res.status(400).json({ success: false, message: 'Invalid input data' });
  }

  try {
    const article = await Article.findByPk(articleId);
    const user = await User.findByPk(userId);

    if (!article || !user) {
      return res.status(404).json({ success: false, message: 'Article or user not found' });
    }

    // Check if the user has already liked the article
    const existingLike = await UserLikes.findOne({
      where: { userId, articleId },
      attributes: ['userId', 'articleId'], // Specify the primary key columns
    });

    if (existingLike) {
      return res.status(400).json({ success: false, message: 'User has already liked this article' });
    }

    // Add a like to the article
    await UserLikes.create({ userId, articleId });
    await article.increment('likes'); // Increment the likes count in the Article model

    return res.status(200).json({ success: true, message: 'Like added successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


// exports.getLikesForArticle = async (req, res) => {
//   const articleId = req.params.id;

//   try {
//     const article = await db.article.findByPk(articleId, {
//       include: [
//         {
//           model: db.user,
//           as: 'likedBy',
//           attributes: ['id', 'username', 'email'], // Include only necessary user attributes
//         },
//       ],
//     });

//     if (!article) {
//       return res.status(404).send({
//         message: `Article with id=${articleId} not found.`,
//       });
//     }

//     res.send({
//       articleId: article.id,
//       likes: article.likedBy,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({
//       message: `Error retrieving likes for Article with id=${articleId}.`,
//     });
//   }
// };

exports.displayGallery = async (req, res) => {
  try {
    const galleryItems = await Article.findAll({
      where: {
        [Op.or]: [
          { image: { [Op.not]: null } },
          { video: { [Op.not]: null } },
        ],
      },
      attributes: ['id', 'titre', 'image', 'video' , 'userId'],
    });

    res.send({ gallery: galleryItems });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error retrieving gallery items' });
  }
};
