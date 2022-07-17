let studentSchema = require("../Models/student.models");

exports.createStudentList = (req, res, next) => {
  const { name, email, rollno } = req.body;
  if (!name || !email || !rollno) {
    return res.status(400).json({
      message: "Please provide all the details",
    });
  }

  studentSchema.create({ name, email, rollno }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      return res.json(data);
    }
  });
};

exports.getStudentsList = (req, res, next) => {
  studentSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      return res.json(data);
    }
  });
};

exports.editStudentList = (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).json({
      message: "Invalid Request",
    });
  }
  studentSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      return res.json(data);
    }
  });
};

exports.updateStudentsList = (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).json({
      message: "Invalid Request",
    });
  }

  const { name, email, rollno } = req.body;
  if (!name || !email || !rollno) {
    return res.status(400).json({
      message: "Please provide all the details",
    });
  }
  studentSchema.findByIdAndUpdate(
    req.params.id,
    { name, email, rollno },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        return res.json(data);
      }
    }
  );
};

exports.deleteStudentList = (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).json({
      message: "Request not valid",
    });
  }
  studentSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
};
