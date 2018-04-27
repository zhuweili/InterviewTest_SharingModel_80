# Prerequisites 


- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [npm](https://www.npmjs.com/get-npm)
- [NodeJS](https://nodejs.org/en/download/)
- [grunt-cli](https://github.com/gruntjs/grunt-cli)


# Setup
0. Add environment variable called `DB_NAME` and give it a unique name. For example it could be `<YOUR_NAME>_SharingApp`
1. Start mongoDB server 
2. `git clone -b <YOUR_BRANCH_NAME> https://github.com/InsightRX/InterviewTest_ShatingModel.git`
3. In terminal, in InterviewTest_ShatingModel directory, run `npm install`
4. In the same dir, run `grunt build` - this tool is building all necessary files, and watches for changes in anything you do. For more details, see *Gruntfile.js*
5. You can start the server by `DB_NAME=<YOUR_NAME>_SharingApp node bin/www`. Launch the app in browser `http://localhost:3000/`


# Submitting an assignment 
Clone this repository into your own git account, and share it with `elenasch` user
