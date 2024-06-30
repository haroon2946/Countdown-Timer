#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import { differenceInSeconds } from "date-fns";
 
console.log(chalk.bold.yellow.italic(("Welcome To \'CodeWithHaroon\' - Countdown-Timer")
));

const res = await inquirer.prompt({
    type:"number",
    name:"userInput",
    message:"Kindly Enter the Amount of Second",
    validate:(input)=>{
        if (isNaN(input)){
            return chalk.bold.red("Kindly Enter Valid Number")
        } else if (input > 60){
            return chalk.bold.red("Seconds must be in 60")
        } else {
            return true;
        }
    }
});

let input = res.userInput

function startTime(val:number){
    const intTime = new Date().setSeconds(new Date().getSeconds() + val);
    const intervalTime = new Date(intTime)
    setInterval(()=>{
        const currentTime = new Date()
        const timeDiff = differenceInSeconds(intervalTime,currentTime);
        if (timeDiff <=0){
            console.log(chalk.bold.red.italic("Timer has Expired"));
            process.exit();
        }
        const minute = Math.floor((timeDiff%(3600*24))/3600)
        const sec = Math.floor(timeDiff % 60);
        console.log(`${minute.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`)
    },1000);
}

startTime(input);