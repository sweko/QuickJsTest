good_numbers = requests => requests.map(i=>s(i))

x = 1000000007
v = 10000
$ = (a,b) => a  * (b / v >> 0) % x * v % x + a * (b % v) % x
s = n => {
	if (s[n])
        return s[n]
    console.log(n);
	var m = Math.floor(n / 2)
	r = ((n % 2 != 0) ? $(2* s(m-1) + s(m),s(m)) : $(s(m-1),s(m-1))+$(s(m),s(m))) % x
	s[n]= r
	return r
}
s[0] = 1
s[1] = 1

QUnit.test("Good Numbers", function(assert) {
    // assert.deepEqual(good_numbers(["1","2","3"]),[1, 2, 3]);
    // assert.deepEqual(good_numbers(["4"]),[5]);
    // assert.deepEqual(good_numbers(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"]),
    //     [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987]);
    // assert.deepEqual(good_numbers(["999999999999999999", "1000000000000000000", "283928328923", "29832983", "2983239823829", "29833298392832", "283291199382", "982372818712732", "839828738999020", "832983232983"]),
    //     [209783453, 680057396, 618955045, 509960106, 266101210, 167489946, 747063837, 880073755, 885185567, 978584536]);
    assert.deepEqual(good_numbers(["999999999999999999"]),[209783453]);
});