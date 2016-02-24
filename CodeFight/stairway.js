function Stairway(n) {
    return s(n);
}

function s(n){
	if (s[n])
        return s[n];
    console.log(n);
	var m = n / 2 >> 0;
	var result = ((n % 2 != 0) ? modmul(2* s(m-1) + s(m),s(m)) : modmul(s(m-1),s(m-1))+modmul(s(m),s(m))) % 1000000007;
	s[n]= result;
	return result;
}

function modmul(a,b){
  var m = 1000000007;
  var sep = 10000;
  var bpart = b / sep >> 0;
  var rest = b % sep ;
  var res = 0;
  for (var i=0; i<sep ; i++)
  {
   res += a  * bpart % m;
  }
  res += a * rest % m;
  return res % m;
}


s[0] = 1;
s[1] = 1;


QUnit.test("Stairway", function(assert) {
    assert.equal(Stairway(1),1);
    assert.equal(Stairway(200),529309711);
    assert.equal(Stairway(999999999),21);
    assert.equal(Stairway(99999),911435502);
    assert.equal(Stairway(21),17711);
});