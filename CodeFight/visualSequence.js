visualSequence = (s, n) => {
    for (var i=0; i<n-1;i++){
		s=next(s);
	}
	return start;
}

next = n => {
    var digits = [[n%10, 1]];
    n/=10;
    l=1;
    while (n !=0){
        if (digits[l][0] == n%10)
            digits[l][0]++;
        else{
            digits.push([d%10, 1]);
            l++;
        }
        n/=10;
    }
    console.log(JSON.stringify(digits));
    return 0;
};


visualSequence(112233);