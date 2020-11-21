module.exports = {
    fizzBuzz: function(num) {
        for (i = 1; i <= num; i++) {
            if (i % 3 == 0 && i % 5 == 0)
                process.stdout.write("FizzBuzz")
            else if (i % 3 == 0)
                process.stdout.write("Fizz")
            else if (i % 5 == 0)
                process.stdout.write("Buzz")
            else
                process.stdout.write(String(i))
            if (i != num)
                process.stdout.write(", ")
        }
        process.stdout.write("\n")
    }
}