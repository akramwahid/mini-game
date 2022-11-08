# experiment game project
Author: Mohamed Akram | Email : akramwahidlk@outlook.com

This is a mini game project build using Vue.js, HTML 5 and Firebase as part of learning.  
## Project setup and test
```
npm install
```
 Compiles and hot-reloads for development
```
npm run serve
```

Compiles and minifies for production
```
npm run build
```

You can also copy past the files in the `dist` folder in a web server for a quick check.

### Manage Configuration Variable 
Copy the .env.example and rename it to .env

I have added a test firebase working api details in .env.example for making the test easy, but in real life it is not good practise to publish those in github

You may adjust the following default settings in .env file.
But the default values are good to go.
```
VUE_APP_ENABLE_TIMER="yes"   // you can enable/disable timer | `yes` or `no`
VUE_APP_TIMESPAN_IN_SECONDS=60  //you can adjust how long game timer will run, in seconds
VUE_APP_SQUARE_SIZE_PX=80    // Individual Unit size in Pixel
VUE_APP_SQUARE_UNIT_ROW=5   // Number of Unit in a row
VUE_APP_SCORE_INCREMENT_BY=1  // by which the score should be inremented 
VUE_APP_DEFAULT_ROBOT_DIRECTION="top"  //by default robot land looking up, `bottom`, `left`, `right`
```

### Data storage
I didn't implement a complete backend, I am using a firebase database for storing data.
You don't need to modify the firebase database configuration in .env file, it is a test database.

if you need further information, you can email me.