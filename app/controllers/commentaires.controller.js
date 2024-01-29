const db = require("../models");
const Commentaires = db.commentaires;
const Op = db.Sequelize.Op;
const sql = db.sequelize;

exports.create = async (req, res) => {
  console.log(req.body)
  try {
    if (!req.body.description) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return;
    }
    Commentaires.create({
      description: req.body.description,
      userId: req.body.userId,
      articleId: req.body.articleId
    }).then((data) => {
      return res.send(data);
    });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying creating Commentaires: ${error}`);
  }
};

exports.findAll = (req, res) => {
  const { articleId } = req.query;
  let condition = articleId
    ? { articleId: { [Op.like]: `%${articleId}%` } }
    : null;
  Commentaires.findAll({ where: condition })
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Commentairess.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Commentaires.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Commentaires with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Commentaires with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  Commentaires.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Commentaires was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Commentaires with id=${id}. Maybe Commentaires was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Commentaires with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Commentaires.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Commentaires was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Commentaires with id=${id}. Maybe Commentaires was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Commentaires with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Commentaires.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Commentairess were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all Commentairess.",
      });
    });
};

exports.findCommentsOfArticle = async (req, res) => {
  const articleId = req.params.articleId;
  const data = await sql
    .query(
      `SELECT users.id as user_id, users.nom as user_nom, users.prenom as user_prenom, users.login as user_login, commentaires.id as comm_id, commentaires.description as comm_desc, commentaires.createdAt, commentaires.updatedAt FROM users, commentaires WHERE users.id = commentaires.userId and commentaires.articleId = ${articleId}`
    )
    .then((data) => {
      console.log("data : ", data[0]);
      res.send(data[0]);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving membres.",
      });
    });
};
// exports.findCommentsOfArticle = async (req, res) => {
//   const articleId = req.params.articleId;
//   const data = await sql
//     .query(
//       `SELECT users.id as user_id, users.nom as user_nom, users.prenom as user_prenom, users.login as user_login, commentaires.id as comm_id, commentaires.description as comm_desc, commentaires.createdAt, commentaires.updatedAt, commentaires WHERE users.id = commentaires.userId AND commentaires.articleId = ${articleId}`
//     )
//     .then((data) => {
//       console.log("data : ", data[0]);
//       res.send(data[0]);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message ||
//           "Some error occurred while retrieving membres.",
//       });
//     });
// };
