
app.factory('calculations', function(a, op, b){
	
	switch(op){
		case '+':
			return a+b;
		break;
		case '-':
			return a-b;
		break;
		case '×':
			return a*b;
		break;
		case '÷':
			return (b !== 0)? a/b : null;
		break;
		
		default:
			return null;
	}	
});
