//Libary Storage Data
let fs = require("fs");
let path = require("path");

let lib = {};

lib.baseDir = path.join(__dirname, "/../.data/");

//create data
lib.create = (dir, file, data, next) => {
  fs.open(
    lib.baseDir + dir + "/" + file + ".json",
    "wx",
    (err, fileDescritor) => {
      if (!err && fileDescritor) {
        let stringData = JSON.stringify(data);

        fs.writeFile(fileDescritor, stringData, err => {
          if (!err) {
            fs.close(fileDescritor, err => {
              if (!err) {
                next(false);
              } else {
                next("Erro closing new file");
              }
            });
          } else {
            next("Erro writing new file");
          }
        });
      } else {
        next("Could not create new file.");
      }
    }
  );
};

//read data
lib.read = (dir, file, next) => {
  fs.readFile(
    lib.baseDir + dir + "/" + file + ".json",
    "utf-8",
    (err, data) => {
      if (!err) {
        next(err, data);
      } else {
        next(err);
      }
    }
  );
};

//update data
lib.update = (dir, file, data, next) => {
  fs.open(
    lib.baseDir + dir + "/" + file + ".json",
    "r+",
    (err, fileDescritor) => {
      if (!err && fileDescritor) {
        let stringData = JSON.stringify(data);

        fs.truncate(fileDescritor, err => {
          if (!err) {
            fs.writeFile(fileDescritor, stringData, err => {
              if (!err) {
                fs.close(fileDescritor, err => {
                  if (!err) {
                    next(false);
                  } else {
                    next("Erro closing file");
                  }
                });
              } else {
                next("Erro write file");
              }
            });
          } else {
            next("Erro update file");
          }
        });
      } else {
        next("Could not create new file.");
      }
    }
  );
};

lib.delete = (dir, file, next) => {
  fs.unlink(
    lib.baseDir + dir + "/" + file + ".json",
    (err, data) => {
      if (!err) {
        next(err, data);
      } else {
        next(err);
      }
    }
  );
};

module.exports = lib;
