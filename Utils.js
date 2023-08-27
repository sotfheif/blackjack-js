function shuffled(arr) { //tested a bit
    let indexArray = [...Array(arr.length).keys()]
    res = []
    while (indexArray.length > 0) {
        const ind = Math.floor(Math.random() * indexArray.length)
        res.push(arr[indexArray[ind]])
        indexArray.splice(ind, 1)
		
        console.log("indexArray=" + indexArray)
		console.log("indexArray.length=" + indexArray.length)
        console.log("ind="+ind)
        console.log("res=" + res)
    }
	return res
}