var gcd = (a, b)=>{
    while (b !== 0){
       var t = b; 
       b= Math.floor(a % b);
       a=t; 
	}
    return a; 
};

var dp = (n,d) => {
    var p = n.reduce((a,b)=> a * (b.freq+1), 1);
    for (var i = 0; i < n.length; i++) {
        if (d[i].freq !== n[i].freq * p / 2)
             return false;
    }
    return true;
}

DivisorProduct = x => {
    if (x.length === 0)
        return 1;
    var current = { prime: x[0], freq: 1}; 
    var xx =[current];
    for (var i = 1; i < x.length; i++) {
        if (x[i]===current.prime){
            current.freq+=1;
        } else {
            current = { prime: x[i], freq: 1};
            xx.push(current);
        }
    }
    
    if  (xx.length === 1){
        return Math.pow(xx[0].prime, (Math.sqrt(1+8*xx[0].freq)-1)/2);
    }
    var g = xx.reduce((a,b)=> gcd(a.freq,b.freq));
    var index = 1;
    while (true){
        var xxx = xx.map(i => {return {prime:i.prime, freq: index * i.freq / g}});
        if (dp(xxx, xx)){
            var result = xxx.reduce((a,b) => a * Math.pow(b.prime, b.freq), 1);
            return result;    
        }
        index+=1;
    }
    
    return -1;
}

QUnit.test("divisorProduct", function (assert) {
    assert.equal(DivisorProduct([2, 2, 3, 3]), 6);
    assert.equal(DivisorProduct([97]), 97);
    assert.equal(DivisorProduct([2, 2, 2, 2, 2, 2, 3, 3, 3]), 12);
    assert.equal(DivisorProduct([2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 5, 5, 5, 5, 5, 5, 5, 5]), 100);
    assert.equal(DivisorProduct([]), 1);
});