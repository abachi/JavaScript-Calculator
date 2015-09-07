/*
1-User Story: As a user, I can add, subtract, multiply and divide two numbers.

2-Bonus User Story: I can clear the input field with a clear button.

3-Bonus User Story: I can keep chaining mathematical operations together until I 
hit the clear button, and the calculator will tell me the correct output.
*/

/*

		



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
				return (
						str.indexOf('+') > -1 ||
						str.indexOf('-') > -1 ||
						str.indexOf('×') > -1 ||
						str.indexOf('÷') > -1 
					);
			},
			operationsSort: function(str){
					
					// make sure this str is a chain of operations
					var pattren = new RegExp(/(^([^×÷]?\d*(\+|\-|\×|\÷){1}\d+)+)$/g);

					// 
					if(!pattren.test(str)){  console.log('null'); return null;}
					console.log('rani fet')
					var operation = {
							a:'',
							op:'',
							b:''
						},
						i;
					while(this.hasOperation(str)){
						console.log('hello')
						
						for( i=0; i<str.length; i++){
							if(this.isOperator(str[i]) && i>0){
								operation.op = this.isOperator(str[i]);
								console.log('break', 'the operation.op : ', operation.op);
								break;
							}else{
								operation.a+=str[i];
								console.log('the operation.a : ', operation.a);
							}
						}
						for(i=str.indexOf(operation.op)+1; i<str.length; i++){
							if(this.isOperator(str[i])){
								console.log('break')
								break;
							}else{
								operation.b+=str[i];
							}
						}
						operation.a = parseInt(operation.a);
						operation.b = parseInt(operation.b);
						console.log(operation.a,operation.b)

						str = this.calc(operation.a, operation.op, operation.b) + str.slice(i, str.length);
						console.log(str)
						// console.log('i: '+i,str.slice(i, str.length), 'hada result '+str)
						i=0;
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
				// clean the local vars
				return; 
			}
			if(input == '='){
				$scope.calculator.calScreen = calculations.operationsSort($scope.calculator.calScreen);
			}
			if(input !== 'DEL' && input !== '='){
				$scope.calculator.calScreen +=input;

				// return;
			}	

			//console.log($scope.calculator.calScreen)
		};
}]);
