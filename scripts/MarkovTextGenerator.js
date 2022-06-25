const VALID_PAIRS = Object.keys(model);

function GenerateLine() {
    line = ["$", "$"];

    var pair = line[line.length - 2] + " " + line[line.length - 1];
    while (line[line.length - 1] != "^" && VALID_PAIRS.indexOf(pair) > -1) {
        line.push(chance.weighted(model[pair].words, model[pair].counts))
        pair = line[line.length - 2] + " " + line[line.length - 1];
    }

    return line.slice(2).reduce(function (sentence, nextWord) {
        if (nextWord == "^") {
            return sentence;
        } else {
            return sentence + " " + nextWord;
        }
    })
}

$(function () {
    $("#aGenerateLine").on("click", function () {
        $("#h3Line").text(GenerateLine());
    });
})