var db = require(__dirname + '/mysql');

/* Lists all grades of a student */
exports.generateTCG = function (req, res, next) {
     db.query("SELECT * FROM grade where studentNumber = ?",
        [req.body.studentNumber],

        function (err, rows) {
            if (err) {
                return next(err);
            }

            res.send(rows);
    });
} 


