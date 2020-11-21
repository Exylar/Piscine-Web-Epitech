module.exports = {
    drawTriangle: function(limit) {
        for (let i = 1; i <= limit; i++) {
            for (let j = 0; j < i; j++) {
                process.stdout.write("$");
            }
            process.stdout.write("\n");
        }
    }
}