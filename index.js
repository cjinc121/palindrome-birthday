
function reversestr(str){
  var list=str.split("");
  var reverselist=list.reverse();
 return reverselist.join("");
}
function isPalindrome(str)
{
  if(reversestr(str)===str)
  return true;
  else
  return false;
}
function datestr(date) {
  var dateInStr = { day: "", month: "", year: "" };

  if (date.day < 10) {
    dateInStr.day = "0" + date.day;
  } else {
    dateInStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateInStr.month = "0" + date.month;
  } else {
    dateInStr.month = date.month.toString();
  }

  dateInStr.year = date.year.toString();
  return dateInStr;
}
function allDateFormat(date)
{
  // var strdate=date;
  var ddmmyyyy=date.day+date.month+date.year;
  var mmddyyyy=date.month+date.day+date.year;
  var yyyymmdd=date.year+date.month+date.day;
  var ddmmyy=date.day+date.month+date.year.slice(-2);
  var mmddyy=date.month+date.day+date.year.slice(-2);
  var yymmdd=date.year.slice(-2)+date.month+date.day;
  var dateList=[ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd];
  
  return dateList;
}
function isPalindromeAllDateFormat(date)
{
  var all=allDateFormat(date);
  var palindromeList=[];
  
  for(var i=0;i<all.length;i++)
  {
    var result=isPalindrome(all[i]);
    palindromeList.push(result);
  }
  // console.log(PalindromeList);
  return palindromeList;
}
function isLeap(year)
{
  if(year%400===0)
  return true;
  if(year%100===0)
  return false;
  if(year%4===0)
  return true;
  return false;
}
function nextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeap(year)) {
      if (day > 29) {
        day = 1;
        month = 3;
      }
    }
    else {
      if (day > 28) {
        day = 1;
        month = 3;
      }
    }
  }
  else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}
function nextPalindrome(date)
{var nxtdate=nextDate(date);
  var countn=0;
  while(1)
  {countn++;
    console.log(nxtdate);
    var dtstr=datestr(nxtdate);
    var res=isPalindromeAllDateFormat(dtstr);
    for (let i = 0; i < res.length; i++) 
    {
      if(res[i])
      {
        return [countn,nxtdate];
      }
    }
    nxtdate=nextDate(nxtdate);
}}
function prevDate(date) {
  var day = date.day - 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];


  if (day === 0) {
    month--;

    if (month === 0) {
      month = 12;
      day = 31;
      year--;
    } else if (month === 2) {
      if (isLeapYear(year)) {
        day = 29;
      } else {
        day = 28;
      }
    } else {
      day = daysInMonth[month - 1];
    }
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}
function prevPalindrome(date)
{var prvdate=prevDate(date);
  var countp=0;
  while(1)
  {countp++;
    console.log(prvdate);
    var datstr=datestr(prvdate);
    var resl=isPalindromeAllDateFormat(datstr);
    for (let i = 0; i < resl.length; i++) 
    {
      if(resl[i])
      {
        return [countp,prvdate];
      }
    }
    prvdate=nextDate(prvdate);
}}
var inp=document.querySelector(".inp");
var button=document.querySelector(".btn");
var message=document.querySelector(".msg");

function clickHandler(e)
{
  var bday=inp.value;
  if(bday!=="")
  {
    var date=bday.split("-");
    var yyyy=date[0];
    var mm=date[1];
    var dd=date[2];
    var date={
      day:Number(dd),
      month:Number(mm),
      year:Number(yyyy),
    };
    var dateStr=datestr(date);
    var list=isPalindromeAllDateFormat(dateStr);
    var isaPalindrome=false;
    for(let i=0;i<list.length;i++)
    {
      if(list[i])
      {
        isaPalindrome=true;
        break;
      }
    }
    if(!isaPalindrome){
      const [ctr1,nextDate]=nextPalindrome(date);
      const [ctr2,prevDate]=prevPalindrome(date);
      if (ctr1 > ctr2) {
        message.innerText = `The nearest palindrome date is ${prevDate.day}-${prevDate.month}-${prevDate.year}, you missed by ${ctr2} days.`;
      } else {
        message.innerText = `The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${ctr1} days.`;
      }
    } else {
      message.innerText = "Yay! Your birthday is palindrome!";
    }

    }
}

button.addEventListener("click",clickHandler);
