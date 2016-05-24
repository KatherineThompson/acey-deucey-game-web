# acey-deucey-game-web
A web app for the backgammon variant acey deucey

[![Build Status](https://travis-ci.org/KatherineThompson/acey-deucey-game-web.svg?branch=master)](https://travis-ci.org/KatherineThompson/acey-deucey-game-web)

##Technologies Used
* CSS
    * CSS3 animations
    * [Foundation](http://foundation.zurb.com/apps.html)
    * [Sass](http://sass-lang.com/)
* HTML
* Javascript ES2015
    * [Angular](https://angularjs.org/)
    * [Babel](http://babeljs.io/)
    * [JSHint](http://jshint.com/)
    * [lodash](https://lodash.com/)
    * [Webpack](https://webpack.github.io/)
* [Travis CI](https://travis-ci.org/)

##Features
*Uses [acey-deucey-game-engine](https://www.npmjs.com/package/acey-deucey-game-engine) as a backend to implement a
game of the backgammon variant acey deucey.

##What I Learned
One big thing I learned between this project and the game engine is that 

This project helped me become much more comfortable setting up a new project, installing dependencies, and using the
command line which had been intimidating for my first few projects.

I started the project off as mobile first and 

I've continued to enjoy using Foundation and Sass. Foundation's
grid is flexible and invaluable for lining up the layout. The built in elements, such as panels and modals, were extremely
useful as well. They were easy to use and would have taken a significant amount of time for me to build. I love the mixins in
Sass as they made my CSS much cleaner and allowed me to reuse parts of it. The variables are likewise useful and make it very
easy to change commonly used values. The conditionals helped add more flexibility and variation without adding a whole new
rule. I like the ability to nest rules because it helps to keep things organized and like the conditionals, can simplify and 
avoid duplication.

This was my first project with Angular and while it was inscrutable at first, it made this project much easier and cleaner
than if I had only used JQuery. For one thing, my HTML was so much simpler after I added angular as using ng-repeat and
custom directives isolated and simplified a lot of the complexity.

Babel is nice as it allows me to use ES2015. In this project, I used destructuring, const/let, and fat arrows among other
features. They all aided me in writing clear and concise code.

JSHint helps me to be stylistically consistent and aids in catching errors as well.

lodash made it much simpler to deal with collections and made my code more readable as the functions tend to be semantic. 

Webpack was a bit of a challenge to set up, but made it easy to use different files which is integral for me in maintaining
a good organzational scheme.

Travis CI helps me to feel more confident that the code I'm deploying isn't buggy.

##Areas for Further Development
* Adding the ability for players to simultaneously play a game from different machines.
* Improving some of the small, browser specific, styling issues.
* Adding more animations and sound effects.