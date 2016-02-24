function greatestNumber(n, m, k) {
    var nn=(n+"").split('').map(function(d){return d-0;});
    var kk= Math.pow(2, k);
    var max=0;
    for (var i=0; i<kk; i++){
        var q = 0;
        var ii = i;
        var ix = 0;
        var c=0;
        while(ii > 0){
            if (ii % 2!==0){
                c++;
                q = q * 10 + nn[ix];
            }
            ii = Math.floor(ii/2);
            ix++;
        }
        if ((c+m===k) && (q> max)){
            max = q;
        }
    }
    return max+"";
}

QUnit.test("greatestNumber", function(assert) {
    assert.equal(greatestNumber(1234, 1, 4), "234");
	assert.equal(greatestNumber(97730, 3, 5), "97");
	assert.equal(greatestNumber(7940, 1, 4), "940");
	assert.equal(greatestNumber(4288559, 3, 7), "8859");
	assert.equal(greatestNumber(8991, 2, 4), "99");
});