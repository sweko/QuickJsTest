module game{
	export class Shape{
		private size:number;
		private top:number;
		private left:number;
		private element: HTMLDivElement;
		private leftDirection: number;
		private topDirection: number;
		private color:string;
		
		constructor(public cssClass:string, public container: HTMLElement){
			
		}
		
		public createAt(center: IPoint){
			this.element = document.createElement("div");
			this.element.className=this.cssClass;

			//cannot be bigger that half the screen (arbitrary limit)
			var maxSize = Math.min(this.container.clientHeight, this.container.clientWidth) / 2;
			//cannot be bigger than the distance from the offset to the border
			var maxSize = Math.min(maxSize, center.x, center.y, this.container.clientWidth - center.x, this.container.clientHeight-center.y);
			
			this.size = Randomizer.getRandomTo(maxSize);
			this.left = center.x - this.size / 2;
			this.top = center.y - this.size / 2;
			
			this.color = Randomizer.getRandomColor();
			
			this.setStyle();
			this.container.appendChild(this.element);
		}
		
		private setStyle(){
			this.element.style.width = this.size+"px";
			this.element.style.height = this.size+"px";
			this.element.style.top = this.top+"px";
			this.element.style.left = this.left +"px";
			this.element.style.backgroundColor = this.color;
		}
		
		public energize(){
			while (!this.leftDirection)
				this.leftDirection = Randomizer.getRandomRange(-4, 5);
			while (!this.topDirection)
				this.topDirection = Randomizer.getRandomRange(-4, 5);
				
			if ((this.left + this.leftDirection < 0) || (this.left + this.size + this.leftDirection > this.container.clientWidth))
				this.leftDirection = - this.leftDirection;
				
			if ((this.top + this.topDirection < 0) || (this.top  + this.size + this.topDirection > this.container.clientHeight))
				this.topDirection = - this.topDirection;

			this.left += this.leftDirection;
			this.top += this.topDirection;
			this.setStyle();
			setTimeout(() => this.energize(), 0);
		}
		
	}
	
	interface IPoint{
		x: number;
		y:number;
	}
	
	export class Shaper{
		
		private static shapes:[(HTMLElement)=>Shape]  = [
			(c:HTMLElement)=> new Shape("box",c),
			(c:HTMLElement)=> new Shape("circle", c),
		];
		
		constructor(public container: HTMLElement){
			
		}
		
		public start(){
			console.log("shaper started");
			this.container.addEventListener("click", (event)=>{
				//we're using the fact that the container is actually the body element
				this.createShape({x: event.clientX, y: event.clientY});
				event.preventDefault();
			})

		}
		
		private createShape(center: IPoint){
			console.log(`creating shape @(${center.x},${center.y})`);
			var shapeIndex = Randomizer.getRandomTo(Shaper.shapes.length);
			var shape = Shaper.shapes[shapeIndex](this.container);
			console.log(shape);
			shape.createAt(center);
			shape.energize();
		}
	}
	
	export class Randomizer{
		public static getRandomColor(){
			//naive approach, should use HSB randomization for evenly spaced colors;
			var letters= '0123456789abcdef'.split("");
			var color = Array.apply(null, Array(6)).map(_ =>  letters[Randomizer.getRandomTo(16)]).join("");
    		return "#"+color;
		}
		
		public static getRandomTo(bound: number){
			return Math.floor(Math.random() * bound);
		}
		
		public static getRandomRange(low: number, high: number){
			var range = high - low;
			return low + Math.floor(Math.random() * range);
		}
		
	}
}

document.addEventListener('DOMContentLoaded', function(){
	var container = document.getElementById("content");
   	var shaper = new game.Shaper(container);
	shaper.start(); 
});
