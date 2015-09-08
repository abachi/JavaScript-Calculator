/*
1-User Story: As a user, I can add, subtract, multiply and divide two numbers.

2-Bonus User Story: I can clear the input field with a clear button.

3-Bonus User Story: I can keep chaining mathematical operations together until I 
hit the clear button, and the calculator will tell me the correct output.
*/


var app = angular.module('Calculator', []);

app.service('calculations', function(){
			this.operators = ['DEL','+','-','×','÷'];
			this.isOperator = function(operator){
				return  (this.operators.indexOf(operator) > -1)?
						operator : false;
			};
			this.calculateOneOperation = function(a, operator, b){

				switch(operator){
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
			};
			this.hasOperation = function(str){
				for(var i=str.length; i>0; i--){
					if(this.isOperator(str.charAt(i)))
						return true;
				}
				return false;
			};
			this.isChainOfOperations = function(chain){
				// exemple: -2+7÷2
				var pattren = new RegExp(/(^((\+|\-)?\d*(\+|\-|\×|\÷){1}\d+)+)$/g);
				 return pattren.test(chain);
			};
			this.caclulate = function(str){
				
					if(!this.isChainOfOperations(str)){
						return null;
					}
					var operation = {
							a:'',
							op:'',
							b:''
						},
						i=0;
					// TODO : clean this piece
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
						str = this.calculateOneOperation(operation.a, operation.op, operation.b) + str.slice(i, str.length);
						operation.op='';
						operation.a='';
						operation.b='';							
					}
					return str;
			};	// End TODO
});

app.controller('MainController',['$scope', function($scope){
	$scope.calculator = {};
	$scope.calculator.screen = '';

}]);

app.controller('BtnController', ['$scope', 'calculations', function($scope, calculations){
		$scope.btns = [7,8,9,4,5,6,1,2,3,'.',0,'='];
		$scope.operators =calculations.operators;
		$scope.insert = function(e){
			var input = e.target.childNodes[0].textContent.trim();
			if(input == 'DEL'){
				$scope.calculator.screen = '';
				return; 
			}
			if(input == '='){
				var result = calculations.caclulate($scope.calculator.screen);
				if(result)
					$scope.calculator.screen = result; 
				return;
			}
			if(input !== 'DEL' && input !== '='){
				$scope.calculator.screen +=input;
				return;
			}	
		};
}]);
