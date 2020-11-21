module.exports = {
    range: function(start, end, step) {
        let array = [];
    
        if (start <= end) {
            if (step < 0)
                return array
            step = typeof step !== 'undefined' ? step : 1;
            for (i = start; i <= end; i = i + step) {
                array.push(i)
            }
        }
        else {
            if (step >= 0)
                return array
            step = typeof step !== 'undefined' ? step : -1;
            for (i = start; i >= end; i = i + step) {
                array.push(i)
            }
        }
        return array
    }
}