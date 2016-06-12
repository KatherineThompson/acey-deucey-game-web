# acey-deucey-game-web
A web app for the backgammon variant acey deucey

[![Build Status](https://travis-ci.org/KatherineThompson/acey-deucey-game-web.svg?branch=master)](https://travis-ci.org/KatherineThompson/acey-deucey-game-web)

##Technologies Used
* CSS
    * [Autoprefixer](https://github.com/postcss/autoprefixer)
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
* Uses [acey-deucey-game-engine](https://www.npmjs.com/package/acey-deucey-game-engine) to implement a
game of the backgammon variant acey deucey.

##What I Learned
Between this project and the game engine, I learned that bottom-up design is hard.
When working on the first portion of a project, it can be
hard to predict what is going to be most useful for the second part. For instance, the game engine looks through the
moves that a player has proposed and matches the number of spaces being moved with the possible rolls from the dice.
As it turns out, the UI needs to keep track of which rolls have been used and if a move matches any of the dice.
It would have been much easier to package the dice roll together with the proposed moves and pass it to the game engine
rather than doing similar calculations twice. It gets even more inefficient since it's possible to move a piece off
the board even if the roll is larger than the number of spaces to move off which makes it more complex than just checking
if two lists contain the same numbers.

This project definitely helped me become comfortable setting up a new repo, installing dependencies, and
using the command line, a task that had been quite intimidating for my first few projects. I started the project off as mobile
first. It turned out to be a good strategy as it made me consider the limitations of a smaller screen before committing to a design.
I can only imagine how frustrating it would be to create a layout, make everything work, then realize that it just wasn't
going to cut it on a smaller device.

I've continued to enjoy using Foundation and Sass. Adding in Autoprefixer really helped with some of the browser
specific issues. Foundation's grid is flexible and invaluable for lining up the layout. I'm a bit disappointed that the 
vertical grid is not nearly as robust as the regular grid. However, the built in elements, such as panels and modals,
were extremely useful and made my layout and code cleaner.
I continue to love the mixins in Sass as they make my CSS much simpler and allow reuse of certain
parts. The variables are likewise useful and make it very easy to change commonly used values. The conditionals
helped add more flexibility and variation without adding a whole new rule. I also enjoy the ability to nest rules because it
helps to keep things organized and, like the conditionals, can simplify and avoid duplication.

This was my first project with Angular and while it was absolutely inscrutable at first, it made this project much easier
and cleaner in the long run. For one thing, my HTML was so much simpler after I added Angular. Using
`ng-repeat` and custom directives isolated and simplified a lot of the complexity. I liked Angular's event based nature
as most of my code is responding to the players' actions. Once the app gets big enough, it can get a bit difficult to
reason about the nested scopes, but overall, it was a huge step up from using vanilla JS and jQuery.

I love that Babel allows me to use ES2015. In this project, I used destructuring, const/let, and fat arrows, among other
features. They all aided me in writing clear and concise code. Lodash made it much simpler to deal with collections
and made my code more readable as the functions tend to be semantically named.

Webpack was a bit of a challenge to set up, but eventually made it easy to use different files which is vital for maintaining
a good organzational scheme. JSHint helps me to be stylistically consistent and aids in catching errors as well. With
Travis CI, it helps me to feel more confident that the code I'm deploying isn't buggy.

##Areas for Further Development
* Adding the ability for players to simultaneously play a game from different machines.
* Improving the browser-specific styling issues.
* Adding more animations and sound effects.