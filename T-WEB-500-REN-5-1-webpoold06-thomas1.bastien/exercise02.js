module.exports = {
    arraysAreEqual: function(arr1, arr2) {
        return JSON.stringify(arr1) == JSON.stringify(arr2);
    }
}

module.exports = {
    arraysAreEqual: function(arr1, arr2) {
        if (arr1.length != arr2.length)
            return false;
        
        const keys1 = Object.keys(arr1);
        const keys2 = Object.keys(arr2);
        for (const key of keys1) {
            const val1 = arr1[key];
            const val2 = arr2[key];
            if (val1 != val2)
                return false;
        }
        return true;
    }
}