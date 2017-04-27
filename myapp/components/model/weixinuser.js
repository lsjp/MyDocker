var db = require("../../db");

exports.insert = function () {
    var stmt = db.prepare("INSERT INTO user VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
    for (var i = 0; i < 10; i++) {
        stmt.run(i, 1, 0, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14);
    }
    stmt.finalize();
};

exports.search = function (sql) {
        db.each(sql, function (err, row) {
        //console.log(row.id + ": " + row.nickname);
        console.log(row.nickname);
    });
};

exports.delete = function () {

};