/*
1-User Story: As a user, I can add, subtract, multiply and divide two numbers.

2-Bonus User Story: I can clear the input field with a clear button.

3-Bonus User Story: I can keep chaining mathematical operations together until I 
hit the clear button, and the calculator will tell me the correct output.
*/

var app = angular.module('Calculator', []);

app.service('calculations', function(){
	return {
			isOperator: function(op){
				return  (['+','-','×','÷'].indexOf(op) > -1)?
						op : false;
			},
			calc: function(a, op, b){
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
			},
			hasOperation: function(str){
				// 0  because of the negatives numbers
				for(var i=str.length; i>0; i--){
					if(this.isOperator(str.charAt(i)))
						return true;
				}
				return false;
			},
			operationsSort: function(str){
					// make sure this str is a chain of mathematical operations
					var pattren = new RegExp(/(^((\+|\-)?\d*(\+|\-|\×|\÷){1}\d+)+)$/g);
					if(!pattren.test(str)){  
						return null;
					}

					var operation = {
							a:'',
							op:'',
							b:''
						},
						i=0;
					while(this.hasOperation(str)){						
						for( i=0; i<str.length; i++){
							if(this.isOperator(str[i]) && i>0){
								operation.op = this.isOperator(str[i]);
								break;
							}else{
								operation.a+=str[i];
							}
						}				
						for(i=i+1; i<str.length; i++){
							if(this.isOperator(str[i])){
								break;
							}else{
								operation.b+=str[i];
							}
						}
						operation.a = parseFloat(operation.a);
						operation.b = parseFloat(operation.b);
						str = this.calc(operation.a, operation.op, operation.b) + str.slice(i, str.length);
						operation.op='';
						operation.a='';
						operation.b='';							
					}
					return str;
			}	
	}
});

app.controller('MainController',['$scope', function($scope){
	$scope.calculator = {};
	$scope.calculator.calScreen = '';

}]);

app.controller('BtnController', ['$scope', 'calculations', function($scope, calculations){

		$scope.numbers = [
			{value: '7'},
			{value: '8'},
			{value: '9'},
			{value: '4'},
			{value: '5'},
			{value: '6'},
			{value: '1'},
			{value: '2'},
			{value: '3'},
			{value: '.'},
			{value: '0'},
			{value: '='}];
		$scope.operations = [
			{value: 'DEL'},
			{value: '×'},
			{value: '÷'},
			{value: '+'},
			{value: '-'}];
		$scope.insert = function(e){
			var input = e.target.childNodes[0].textContent.trim();
			if(input == 'DEL'){
				$scope.calculator.calScreen = '';
				return; 
			}
			if(input == '='){
				var result = calculations.operationsSort($scope.calculator.calScreen);
				if(result)
					$scope.calculator.calScreen = result; 
				return;
			}
			if(input !== 'DEL' && input !== '='){
				$scope.calculator.calScreen +=input;
				return;
			}	
		};
}]);
