module.exports = {
    arrayFiltering: function(array, test) {
        let res = []
        for (ele of array) {
            if (test(ele))
                res.push(ele) 
        }
        return res
    }
}